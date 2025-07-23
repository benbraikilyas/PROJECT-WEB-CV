import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, Globe, Feather, Lightbulb, Clock, Zap } from 'lucide-react';

const WorldsComparison: React.FC = () => {
  const oldWorldFeatures = [
    {
      icon: Scroll,
      title: "Ancient Wisdom",
      description: "Timeless philosophies and classical literature that have shaped civilizations"
    },
    {
      icon: Globe,
      title: "Global Heritage",
      description: "Rare manuscripts and texts from Europe, Asia, Africa, and the Middle East"
    },
    {
      icon: Clock,
      title: "Historical Depth",
      description: "Centuries of human thought, from ancient scrolls to medieval codices"
    }
  ];

  const newWorldFeatures = [
    {
      icon: Lightbulb,
      title: "Modern Innovation",
      description: "Contemporary voices pushing the boundaries of literature and thought"
    },
    {
      icon: Feather,
      title: "Indie Authors",
      description: "Emerging talents and independent publishers from the Americas and Oceania"
    },
    {
      icon: Zap,
      title: "Fresh Perspectives",
      description: "Current themes, diverse narratives, and cutting-edge literary techniques"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-ink mb-6">
            Two Worlds, One Library
          </h2>
          <p className="text-lg text-old-world-600 max-w-3xl mx-auto leading-relaxed">
            Experience the profound dialogue between ancient wisdom and contemporary innovation. 
            Our curated collection bridges millennia of human expression.
          </p>
        </motion.div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl">
          {/* Old World Section */}
          <motion.div
            id="old-world"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-old-world-100 to-old-world-200 p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-old-paper opacity-20"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <Scroll className="w-12 h-12 text-old-world-600 mr-4" />
                <h3 className="text-3xl font-old-world font-bold text-ink">
                  Old World Books
                </h3>
              </div>
              
              <p className="text-old-world-700 font-old-world text-lg mb-8 leading-relaxed italic">
                "In the old books lies the wisdom of ages, where every page whispers 
                the secrets of civilizations past..."
              </p>

              <div className="space-y-6">
                {oldWorldFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <feature.icon className="w-6 h-6 text-old-world-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-old-world font-semibold text-ink mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-old-world-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-old-world-600 hover:bg-old-world-700 text-parchment font-old-world font-semibold rounded-lg transition-all duration-300"
              >
                Browse Old World Collection
              </motion.button>
            </div>
          </motion.div>

          {/* New World Section */}
          <motion.div
            id="new-world"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-new-world-50 to-new-world-100 p-12 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-modern-grid opacity-30"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-8">
                <Lightbulb className="w-12 h-12 text-new-world-600 mr-4" />
                <h3 className="text-3xl font-new-world font-bold text-new-world-800">
                  New World Books
                </h3>
              </div>
              
              <p className="text-new-world-600 font-new-world text-lg mb-8 leading-relaxed">
                Fresh voices, bold ideas, and contemporary narratives that define 
                our modern literary landscape.
              </p>

              <div className="space-y-6">
                {newWorldFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start space-x-4"
                  >
                    <feature.icon className="w-6 h-6 text-new-world-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-new-world font-semibold text-new-world-800 mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-new-world-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-6 py-3 bg-new-world-600 hover:bg-new-world-700 text-white font-new-world font-semibold rounded-lg transition-all duration-300"
              >
                Explore New World Collection
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WorldsComparison;