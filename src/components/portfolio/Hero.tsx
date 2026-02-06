import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [showResume, setShowResume] = useState(false);
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = ['Python Developer', 'Data Analyst', 'MERN Stack'];

  // Typewriter Effect
  useEffect(() => {
    const currentRole = roles[roleIndex];
    const timeout = setTimeout(() => {
      setText(
        isDeleting
          ? currentRole.substring(0, charIndex - 1)
          : currentRole.substring(0, charIndex + 1)
      );
      setCharIndex((prev) => (isDeleting ? prev - 1 : prev + 1));

      if (!isDeleting && charIndex === currentRole.length) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }, isDeleting ? 50 : 120);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToNext = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-primary to-primary/60 shadow-2xl"
          >
            <img src="./images/profile.png" alt="Mohan M" className="object-cover w-full h-full" />
          </motion.div>

          <motion.h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Hi, I'm <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Mohan M</span>
          </motion.h1>

          <motion.p className="text-xl md:text-2xl text-muted-foreground font-medium h-8">
            {text}
            <span className="text-primary">|</span>
          </motion.p>

          <motion.p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm eager to apply my creativity and problem-solving skills in a dynamic environment. With strong academic roots and practical experience, I aim to contribute effectively while growing professionally.          
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Button
              variant="default"
              size="lg"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-6 text-lg font-semibold"
            >
              Get In Touch
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold"
              onClick={() => setShowResume(true)}
            >
              View Resume
            </Button>
          </div>
        </motion.div>

        {/* Animated Arrow */}
        <motion.div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.button
            onClick={scrollToNext}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>

      {/* Resume Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-background rounded-xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-foreground hover:text-red-500 transition"
              onClick={() => setShowResume(false)}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Download Button */}
            <a
              href="./images/mohanresume123.pdf"
              download="Mohan_M_Resume.pdf"
              className="absolute top-4 left-4"
            >
              <Button size="sm" variant="outline" className="flex items-center gap-1">
                <Download className="w-4 h-4" />
                Download
              </Button>
            </a>

            {/* PDF Viewer */}
            <iframe
              src="./images/mohanresume123.pdf"
              className="w-full h-full mt-15"
              title="Resume PDF"
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export default Home;
