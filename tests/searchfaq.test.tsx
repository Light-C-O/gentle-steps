import {render, screen, fireEvent} from '@testing-library/react';
import SeachFAQ from '../components/searchfaq';
import {FAQ} from '../types/faq';

const mockFAQs: FAQ[] = [
    {
        id: 'faq_0040',
        category: 'Lecture',
        question: 'What is gentle steps?',
        answer: 'A web-based interactive digital book for mothers',
    }
];

test('show "What is gentle steps?" on screen', () => {
    render(<SeachFAQ faqs={mockFAQs} />);
    
    expect(screen.getByText("What is gentle steps?")).toBeInTheDocument();
});

test('shows "Search for a faq..." on screen', ()=> {
    render(<SeachFAQ faqs={mockFAQs} />);

    const inputNode = screen.getByPlaceholderText('Search for a faq...');
    fireEvent.change(inputNode, {target: {value: 'l'}});
    

    expect(screen.getByText("Lecture")).toBeInTheDocument();
});

test('shows that toggle works', ()=> {
    render(<SeachFAQ faqs={mockFAQs} />);


    const buttonText = screen.getByText("What is gentle steps?");

    //the before - dropdown closed
    const drop = screen.queryByText("A web-based interactive digital book for mothers");
    expect(drop).toBeNull();

    // once clicked
    fireEvent.click(buttonText);

    //the after - dropdwon opened
    const seen = screen.queryByText("A web-based interactive digital book for mothers");
    expect(seen).toBeInTheDocument();
});