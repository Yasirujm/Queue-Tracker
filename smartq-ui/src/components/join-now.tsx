'use client';

import React from 'react';

interface ChecklistItemProps {
  text: string;
  checked?: boolean;
}

const ChecklistItem: React.FC<ChecklistItemProps> = ({ text, checked = false }) => {
  return (
    <li className="flex items-start gap-3 mb-4">
      <span className={`inline-block w-5 h-5 mt-0.5 rounded border-2 flex-shrink-0 flex items-center justify-center ${
        checked 
          ? 'bg-green-500 border-green-500 text-white' 
          : 'bg-white border-gray-400'
      }`}>
        {checked && (
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      <span className="text-gray-700 text-base flex-1">{text}</span>
    </li>
  );
};

interface ChecklistSectionProps {
  title: string;
  subtitle: string;
  items: string[];
  checked?: boolean;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  title,
  subtitle,
  items,
  checked = false
}) => {
  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <h3 className="text-xl text-gray-700 mb-6">{subtitle}</h3>
      </div>

      <ul>
        {items.map((item, index) => (
          <ChecklistItem key={index} text={item} checked={checked} />
        ))}
      </ul>
    </section>
  );
};

interface ContentSectionProps {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  checked?: boolean;
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  title,
  subtitle,
  description,
  items,
  checked = false
}) => {
  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
        <h3 className="text-xl text-gray-700 mb-4">{subtitle}</h3>
        <p className="text-gray-700 text-base mb-6 leading-relaxed">{description}</p>
      </div>

      <ul>
        {items.map((item, index) => (
          <ChecklistItem key={index} text={item} checked={checked} />
        ))}
      </ul>
    </section>
  );
};