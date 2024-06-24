import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NumberGuesser from '../components/NumberGuesser';

describe('NumberGuesser', () => {
  test('renders the game with initial state', () => {
    render(<NumberGuesser />);
    expect(screen.getByText(/Number Guesser Game/i)).toBeInTheDocument();
    expect(screen.getByText(/Guess the number between 1 and 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Attempts: 0\/10/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: /guess/i })).toBeInTheDocument();
  });

  test('displays feedback for a low guess', () => {
    render(<NumberGuesser />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '10' } });
    fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    expect(screen.getByText(/Too low!/i)).toBeInTheDocument();
  });

  test('displays feedback for a high guess', () => {
    render(<NumberGuesser />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '90' } });
    fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    expect(screen.getByText(/Too high!/i)).toBeInTheDocument();
  });

  test('displays feedback for a correct guess', () => {
    // Mock the Math.random function to control the secret number
    jest.spyOn(Math, 'random').mockReturnValue(0.49); // secret number will be 50
    render(<NumberGuesser />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    expect(screen.getByText(/Congratulations! You guessed the number!/i)).toBeInTheDocument();
    // Math.random.mockRestore(); // Restore the original implementation
  });

  test('displays feedback for invalid input', () => {
    render(<NumberGuesser />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'abc' } });
    fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    expect(screen.getByText(/Please enter a valid number./i)).toBeInTheDocument();
  });

  test('displays feedback for maximum attempts reached', () => {
    render(<NumberGuesser />);
    for (let i = 0; i < 10; i++) {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: '1' } });
      fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    }
    expect(screen.getByText(/You've reached the maximum attempts!/i)).toBeInTheDocument();
  });

  test('allows restarting the game', () => {
    render(<NumberGuesser />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: '50' } });
    fireEvent.click(screen.getByRole('button', { name: /guess/i }));
    fireEvent.click(screen.getByRole('button', { name: /restart/i }));
    expect(screen.getByText(/Attempts: 0\/10/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
  });
});
