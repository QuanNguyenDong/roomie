import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import TopbarOnly from '../TopbarOnly';
import Topbar from '../../components/Topbar';

jest.mock('../../components/Topbar', () => () => <div>Topbar Mock</div>);

describe('TopbarOnly Layout', () => {
  it('renders the Topbar component and children', () => {
    render(
      <TopbarOnly>
        <div>Mock Child Component</div>
      </TopbarOnly>
    );

    expect(screen.getByText('Topbar Mock')).toBeInTheDocument();
    expect(screen.getByText('Mock Child Component')).toBeInTheDocument();
  });
});
