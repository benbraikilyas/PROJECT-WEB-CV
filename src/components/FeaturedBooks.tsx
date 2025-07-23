import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Calendar, User } from 'lucide-react';

interface Book {
  id: number;
  title: string;
  author: string;
  year: string;
  category: 'old-world' | 'new-world';
  description: string;
  price: string;
  rating: number;
  image: string;
  featured: boolean;
}

const FeaturedBooks: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'old-world' | 'new-world' | 'all'>('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const books: Book[] = [
    {
      id: 1,
      title: "The Analects of Confucius",
      author: "Confucius",
      year: "5th Century BC",
      category: "old-world",
      description: "Ancient Chinese philosophical text containing sayings and ideas attributed to Confucius.",
      price: "$45.00",
      rating: 5,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 2,
      title: "Digital Minimalism",
      author: "Cal Newport",
      year: "2019",
      category: "new-world",
      description: "A philosophy for living better with less technology in our modern world.",
      price: "$28.00",
      rating: 4,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 3,
      title: "The Epic of Gilgamesh",
      author: "Anonymous",
      year: "2100 BC",
      category: "old-world",
      description: "One of the earliest known works of literary fiction, from ancient Mesopotamia.",
      price: "$52.00",
      rating: 5,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 4,
      title: "The Midnight Library",
      author: "Matt Haig",
      year: "2020",
      category: "new-world",
      description: "A contemporary novel about life, regret, and the infinite possibilities of existence.",
      price: "$32.00",
      rating: 4,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 5,
      title: "Meditations",
      author: "Marcus Aurelius",
      year: "161-180 AD",
      category: "old-world",
      description: "Personal writings of the Roman Emperor, offering timeless wisdom on Stoic philosophy.",
      price: "$38.00",
      rating: 5,
      image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    },
    {
      id: 6,
      title: "Klara and the Sun",
      author: "Kazuo Ishiguro",
      year: "2021",
      category: "new-world",
      description: "A haunting story told from the perspective of an artificial friend observing human nature.",
      price: "$29.00",
      rating: 4,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      featured: true
    }
  ];

  const filteredBooks = activeCategory === 'all' 
    ? books 
    : books.filter(book => book.category === activeCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(filteredBooks.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(filteredBooks.length / 3)) % Math.ceil(filteredBooks.length / 3));
  };

  const BookCard: React.FC<{ book: Book }> = ({ book }) => (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={`rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
        book.category === 'old-world' 
          ? 'bg-gradient-to-br from-old-world-50 to-old-world-100' 
          : 'bg-gradient-to-br from-new-world-50 to-new-world-100'
      }`}
    >
      <div className="relative overflow-hidden">
        <img
          src={book.image}
          alt={book.title}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
          book.category === 'old-world'
            ? 'bg-old-world-600 text-parchment'
            : 'bg-new-world-600 text-white'
        }`}>
          {book.category === 'old-world' ? 'Old World' : 'New World'}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-bold mb-2 ${
          book.category === 'old-world' 
            ? 'font-old-world text-ink' 
            : 'font-new-world text-new-world-800'
        }`}>
          {book.title}
        </h3>
        
        <div className="flex items-center space-x-4 mb-3 text-sm">
          <div className="flex items-center space-x-1">
            <User size={14} className={book.category === 'old-world' ? 'text-old-world-600' : 'text-new-world-600'} />
            <span className={book.category === 'old-world' ? 'text-old-world-700' : 'text-new-world-700'}>
              {book.author}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={14} className={book.category === 'old-world' ? 'text-old-world-600' : 'text-new-world-600'} />
            <span className={book.category === 'old-world' ? 'text-old-world-700' : 'text-new-world-700'}>
              {book.year}
            </span>
          </div>
        </div>
        
        <div className="flex items-center mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={`${
                i < book.rating 
                  ? 'text-gold fill-current' 
                  : book.category === 'old-world' 
                    ? 'text-old-world-300' 
                    : 'text-new-world-300'
              }`}
            />
          ))}
        </div>
        
        <p className={`text-sm mb-4 leading-relaxed ${
          book.category === 'old-world' ? 'text-old-world-600' : 'text-new-world-600'
        }`}>
          {book.description}
        </p>
        
        <div className="flex justify-between items-center">
          <span className={`text-2xl font-bold ${
            book.category === 'old-world' ? 'text-old-world-700' : 'text-new-world-700'
          }`}>
            {book.price}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              book.category === 'old-world'
                ? 'bg-old-world-600 hover:bg-old-world-700 text-parchment'
                : 'bg-new-world-600 hover:bg-new-world-700 text-white'
            }`}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="featured" className="py-20 px-4 bg-gradient-to-br from-parchment to-old-world-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Featured Collections
          </h2>
          <p className="text-lg text-old-world-600 max-w-3xl mx-auto leading-relaxed">
            Carefully curated selections from both worlds, representing the finest in human literary achievement.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-12"
        >
          {[
            { key: 'all', label: 'All Books' },
            { key: 'old-world', label: 'Old World' },
            { key: 'new-world', label: 'New World' }
          ].map((filter) => (
            <button
              key={filter.key}
              onClick={() => {
                setActiveCategory(filter.key as any);
                setCurrentSlide(0);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeCategory === filter.key
                  ? 'bg-old-world-600 text-parchment shadow-lg'
                  : 'bg-white text-old-world-600 hover:bg-old-world-100 border border-old-world-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Books Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: Math.ceil(filteredBooks.length / 3) }).map((_, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredBooks
                      .slice(slideIndex * 3, slideIndex * 3 + 3)
                      .map((book) => (
                        <BookCard key={book.id} book={book} />
                      ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Arrows */}
          {Math.ceil(filteredBooks.length / 3) > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronLeft size={24} className="text-old-world-600" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all duration-300"
              >
                <ChevronRight size={24} className="text-old-world-600" />
              </button>
            </>
          )}
        </div>

        {/* Slide Indicators */}
        {Math.ceil(filteredBooks.length / 3) > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(filteredBooks.length / 3) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-old-world-600' : 'bg-old-world-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedBooks;