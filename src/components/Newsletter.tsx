import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Mail, BookOpen, Scroll } from 'lucide-react';

const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

const Newsletter: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
  });

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Welcome to our literary community! Check your email for confirmation.');
      reset();
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    }
  };

  const interests = [
    { id: 'old-world', label: 'Old World Classics', icon: Scroll },
    { id: 'new-world', label: 'New World Literature', icon: BookOpen },
    { id: 'rare-books', label: 'Rare Book Alerts', icon: Mail },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-old-world-100 to-old-world-200 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-old-paper opacity-20"></div>
      
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Mail className="w-16 h-16 text-old-world-600 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Join Our Literary Circle
          </h2>
          <p className="text-lg text-old-world-700 max-w-2xl mx-auto leading-relaxed">
            Receive curated book recommendations, exclusive previews of rare acquisitions, 
            and insights from our literary scholars delivered to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-serif font-semibold text-ink mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-4 py-3 rounded-lg border border-old-world-300 bg-white/90 text-ink focus:ring-2 focus:ring-old-world-500 focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-serif font-semibold text-ink mb-4">
                Literary Interests
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                {interests.map((interest) => (
                  <motion.label
                    key={interest.id}
                    className="flex items-center space-x-3 p-4 bg-white/60 rounded-lg border border-old-world-200 hover:bg-white/80 cursor-pointer transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    <input
                      type="checkbox"
                      value={interest.id}
                      {...register('interests')}
                      className="w-4 h-4 text-old-world-600 border-old-world-300 rounded focus:ring-old-world-500"
                    />
                    <interest.icon size={20} className="text-old-world-600" />
                    <span className="font-serif text-ink">{interest.label}</span>
                  </motion.label>
                ))}
              </div>
              {errors.interests && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.interests.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-old-world-600 hover:bg-old-world-700 disabled:bg-old-world-400 text-parchment font-serif font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-parchment border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Mail size={20} />
                  <span>Subscribe to Newsletter</span>
                </>
              )}
            </motion.button>
          </form>

          {/* Benefits */}
          <div className="mt-8 pt-6 border-t border-old-world-200">
            <p className="text-center text-sm text-old-world-600 mb-4 font-serif italic">
              What you'll receive:
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-center">
              <div className="text-old-world-700">
                <span className="font-semibold">Weekly Picks</span>
                <p className="text-xs mt-1">Curated selections from both worlds</p>
              </div>
              <div className="text-old-world-700">
                <span className="font-semibold">Exclusive Access</span>
                <p className="text-xs mt-1">First look at rare acquisitions</p>
              </div>
              <div className="text-old-world-700">
                <span className="font-semibold">Literary Insights</span>
                <p className="text-xs mt-1">Scholar commentary and analysis</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;