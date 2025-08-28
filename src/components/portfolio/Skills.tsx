import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion, useAnimation, easeOut } from 'framer-motion'; 
import { Badge } from '@/components/ui/badge';
import {
  Code2,
  BarChart3,
  Brain,
  Users,
  Search,
  Palette,
} from 'lucide-react';

const Skills = () => {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const skills = [
    {
      category: 'Fullstack Development',
      icon: <Code2 className="w-6 h-6" />,
      description: 'MERN Stack development with modern frameworks',
      technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'TypeScript', 'JavaScript'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Data Analysis',
      icon: <BarChart3 className="w-6 h-6" />,
      description: 'Statistical analysis and data visualization',
      technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'SQL'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Python Development',
      icon: <Brain className="w-6 h-6" />,
      description: 'Machine learning and backend development',
      technologies: ['TensorFlow', 'Scikit-learn', 'Django', 'Flask', 'OpenCV'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Team Coordination',
      icon: <Users className="w-6 h-6" />,
      description: 'Leadership and project management skills',
      technologies: ['Agile', 'Scrum', 'Leadership', 'Communication', 'Collaboration'],
      color: 'from-orange-500 to-red-500'
    },
    {
      category: 'SEO Fundamentals',
      icon: <Search className="w-6 h-6" />,
      description: 'Search engine optimization and digital marketing',
      technologies: ['Keyword Research', 'On-page SEO', 'Analytics', 'Content Strategy'],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      category: 'UI/UX Design',
      icon: <Palette className="w-6 h-6" />,
      description: 'User interface and experience design',
      technologies: ['Figma', 'Adobe XD', 'Prototyping', 'Wireframing', 'User Research'],
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easeOut // ✅ Fix here
    }
  }
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      ease: easeOut // ✅ Fix here too
    }
  }
};

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            controls.start('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleHoverEvent = () => {
      controls.start('hidden').then(() => controls.start('visible'));
    };

    window.addEventListener('hover-skills-nav', handleHoverEvent);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      window.removeEventListener('hover-skills-nav', handleHoverEvent);
    };
  }, [controls]);

  return (
    <section id="skills" className="py-20 bg-background" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={cardVariants}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive skill set spanning development, data science, and design
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.category}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow duration-300 border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${skill.color} text-white`}>
                        {skill.icon}
                      </div>
                      <h3 className="font-semibold text-lg">{skill.category}</h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {skill.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {skill.technologies.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs px-2 py-1 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
