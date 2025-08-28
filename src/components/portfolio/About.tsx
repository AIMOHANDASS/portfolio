// File: src/components/About.tsx

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, Calendar, Target } from 'lucide-react';

const About = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isActiveByNav, setIsActiveByNav] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#about') {
        setIsActiveByNav(true);
        const timer = setTimeout(() => setIsActiveByNav(false), 5000);
        return () => clearTimeout(timer);
      }
    };

    const handleHoverTrigger = () => {
      setIsHovered(false); // reset first
      setTimeout(() => setIsHovered(true), 150); // re-trigger animation
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('hover-about-nav', handleHoverTrigger);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('hover-about-nav', handleHoverTrigger);
    };
  }, []);

  const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: -100 },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, x: 100 },
  };

  const cardFade = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 20 },
  };

  const shouldShow = isHovered || isActiveByNav;

  return (
    <section
      id="about"
      className="py-20 bg-transparent relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={cardFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <AnimatePresence>
          {shouldShow && (
            <motion.div
              key="aboutContent"
              className="grid lg:grid-cols-2 gap-12 items-center"
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.4 }}
            >
              <motion.div variants={fadeLeft} className="space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a passionate tech student exploring AI and fullstack development. I build smart, user-focused solutions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My focus is on solving real-world problems through clean design, modern tools, and lifelong learning.
                </p>
                <div className="grid gap-3 pt-4">
                  {['Creative Problem Solver', 'Team Collaboration Enthusiast', 'Continuous Learning Mindset'].map((trait, i) => (
                    <motion.div key={i} variants={cardFade} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-foreground font-medium">{trait}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={fadeRight} className="grid gap-6">
                <motion.div variants={cardFade}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 bg-background/40 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <GraduationCap className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Education</h3>
                          <p className="text-muted-foreground mb-1">B.Tech in AI & Data Science</p>
                          <p className="text-sm text-muted-foreground">
                            Chettinad College of Engineering and Technology
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardFade}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 bg-background/40 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Duration</h3>
                          <p className="text-muted-foreground">2022 - 2026</p>
                          <p className="text-sm text-muted-foreground">Currently in 3rd Year</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={cardFade}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 bg-background/40 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1">Goal</h3>
                          <p className="text-muted-foreground">Looking for impactful roles</p>
                          <p className="text-sm text-muted-foreground">To grow and build real-world value</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default About;
