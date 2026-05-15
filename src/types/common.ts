import React from 'react';

export interface KanbanColumn {
  id: string;
  title: string;
  color?: string;
  badge?: string;
}

export interface KanbanItem {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  tags?: { label: string; color: string }[];
  assignee?: { name: string; avatar?: string };
  priority?: 'High' | 'Medium' | 'Low';
  status: string;
  value?: string | number;
  date?: string;
}

export interface GenericEntity {
  id: string;
  [key: string]: any;
}
