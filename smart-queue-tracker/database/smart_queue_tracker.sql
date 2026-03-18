-- Your existing tables (kept as is)
CREATE TABLE public.users (
  id bigint NOT NULL DEFAULT nextval('users_id_seq'::regclass),
  name character varying NOT NULL,
  email character varying NOT NULL UNIQUE,
  password character varying NOT NULL,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['USER'::character varying::text, 'STAFF'::character varying::text, 'ADMIN'::character varying::text])),
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  username character varying,
  user_id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

CREATE TABLE public.services (
  id bigint NOT NULL DEFAULT nextval('services_id_seq'::regclass),
  name character varying NOT NULL,
  location character varying,
  avg_service_time integer NOT NULL,
  staff_id bigint,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT services_pkey PRIMARY KEY (id),
  CONSTRAINT fk_staff FOREIGN KEY (staff_id) REFERENCES public.users(id)
);

CREATE TABLE public.queues (
  id bigint NOT NULL DEFAULT nextval('queues_id_seq'::regclass),
  service_id bigint NOT NULL,
  current_token integer DEFAULT 0,
  status character varying DEFAULT 'ACTIVE'::character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT queues_pkey PRIMARY KEY (id),
  CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES public.services(id)
);

CREATE TABLE public.queue_entries (
  id bigint NOT NULL DEFAULT nextval('queue_entries_id_seq'::regclass),
  queue_id bigint NOT NULL,
  user_id bigint NOT NULL,
  token_number integer NOT NULL,
  status character varying DEFAULT 'WAITING'::character varying,
  joined_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT queue_entries_pkey PRIMARY KEY (id),
  CONSTRAINT fk_queue FOREIGN KEY (queue_id) REFERENCES public.queues(id),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Additional tables needed for full features
CREATE TABLE public.counters (
  id bigint NOT NULL DEFAULT nextval('counters_id_seq'::regclass),
  name character varying NOT NULL,
  service_id bigint,
  staff_id bigint,
  status character varying DEFAULT 'ACTIVE'::character varying,
  location character varying,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT counters_pkey PRIMARY KEY (id),
  CONSTRAINT fk_counter_service FOREIGN KEY (service_id) REFERENCES public.services(id),
  CONSTRAINT fk_counter_staff FOREIGN KEY (staff_id) REFERENCES public.users(id)
);

CREATE TABLE public.login_audit (
  id bigint NOT NULL DEFAULT nextval('login_audit_id_seq'::regclass),
  user_id bigint NOT NULL,
  login_time timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  ip_address character varying,
  user_agent text,
  success boolean DEFAULT true,
  CONSTRAINT login_audit_pkey PRIMARY KEY (id),
  CONSTRAINT fk_login_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);

-- Optional: For notifications
CREATE TABLE public.notifications (
  id bigint NOT NULL DEFAULT nextval('notifications_id_seq'::regclass),
  user_id bigint NOT NULL,
  type character varying,
  message text,
  read boolean DEFAULT false,
  created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT fk_notification_user FOREIGN KEY (user_id) REFERENCES public.users(id)
);




--Client Dashboard Queries
-- Get all available services with queue info
SELECT 
  s.id,
  s.name,
  s.location,
  s.avg_service_time,
  q.id as queue_id,
  q.current_token,
  q.status as queue_status,
  COUNT(qe.id) as waiting_count
FROM services s
LEFT JOIN queues q ON q.service_id = s.id AND q.status = 'ACTIVE'
LEFT JOIN queue_entries qe ON qe.queue_id = q.id AND qe.status = 'WAITING'
GROUP BY s.id, q.id;

-- Get user's current queue entry
SELECT 
  qe.*,
  s.name as service_name,
  q.current_token,
  (SELECT COUNT(*) FROM queue_entries 
   WHERE queue_id = qe.queue_id 
   AND status = 'WAITING' 
   AND token_number < qe.token_number) as position
FROM queue_entries qe
JOIN queues q ON q.id = qe.queue_id
JOIN services s ON s.id = q.service_id
WHERE qe.user_id = ? AND qe.status = 'WAITING'
ORDER BY qe.joined_at DESC
LIMIT 1;

-- Join queue (book)
INSERT INTO queue_entries (queue_id, user_id, token_number, status)
VALUES (
  ?,
  ?,
  (SELECT COALESCE(MAX(token_number), 0) + 1 FROM queue_entries WHERE queue_id = ?),
  'WAITING'
);


--Staff Dashboard Queries

-- Dashboard stats
SELECT 
  (SELECT COUNT(*) FROM queue_entries WHERE status = 'WAITING') as waiting_count,
  (SELECT COUNT(*) FROM queue_entries WHERE status = 'SERVING') as serving_count,
  (SELECT COUNT(*) FROM queue_entries WHERE DATE(joined_at) = CURRENT_DATE) as today_served,
  (SELECT AVG(EXTRACT(EPOCH FROM (completed_at - joined_at))/60) 
   FROM queue_entries WHERE status = 'COMPLETED') as avg_wait_time;

-- Get queue with entries for a service
SELECT 
  q.*,
  s.name as service_name,
  s.avg_service_time,
  json_agg(
    json_build_object(
      'id', qe.id,
      'token', qe.token_number,
      'user_name', u.name,
      'joined_at', qe.joined_at,
      'status', qe.status
    ) ORDER BY qe.token_number
  ) as entries
FROM queues q
JOIN services s ON s.id = q.service_id
LEFT JOIN queue_entries qe ON qe.queue_id = q.id
LEFT JOIN users u ON u.id = qe.user_id
WHERE q.id = ?
GROUP BY q.id, s.id;

-- Call next token
WITH next_entry AS (
  SELECT id, token_number
  FROM queue_entries
  WHERE queue_id = ? AND status = 'WAITING'
  ORDER BY token_number
  LIMIT 1
)
UPDATE queue_entries 
SET status = 'SERVING'
FROM next_entry
WHERE queue_entries.id = next_entry.id
RETURNING next_entry.token_number;

-- Complete serving
UPDATE queue_entries 
SET status = 'COMPLETED'
WHERE id = ?;

-- Login audit
INSERT INTO login_audit (user_id, ip_address, user_agent, success)
VALUES (?, ?, ?, ?);

-- Get login history
SELECT 
  la.*,
  u.name,
  u.email,
  u.role
FROM login_audit la
JOIN users u ON u.id = la.user_id
WHERE DATE(la.login_time) = CURRENT_DATE
ORDER BY la.login_time DESC;