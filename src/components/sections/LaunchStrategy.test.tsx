import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LaunchStrategy } from './LaunchStrategy';

const data = {
  channels: ['Product Hunt', 'Twitter'],
  first100Users: 'Early adopters from niche communities',
  acquisitionChannels: ['Reddit communities', 'Discord servers'],
  weeklyRoadmap: ['Week 1: Ship landing page', 'Week 2: Launch beta'],
};

describe('LaunchStrategy', () => {
  it('renders every launch channel, first 100 users, acquisition channel, and roadmap item', () => {
    render(<LaunchStrategy data={data} />);

    data.channels.forEach((channel) => {
      expect(screen.getByText(channel)).toBeInTheDocument();
    });

    expect(screen.getByText(data.first100Users)).toBeInTheDocument();

    data.acquisitionChannels.forEach((channel) => {
      expect(screen.getByText(channel)).toBeInTheDocument();
    });

    data.weeklyRoadmap.forEach((step) => {
      expect(screen.getByText(step)).toBeInTheDocument();
    });
  });
});
