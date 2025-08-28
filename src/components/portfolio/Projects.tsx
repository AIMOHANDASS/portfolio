import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Eye, Shield, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

const Projects = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const projects = [
    {
      title: 'Hostel Attendance System',
      description: 'An intelligent attendance management system using machine learning face detection technology integrated with SQL database for efficient student tracking.',
      technologies: ['Machine Learning', 'Face Detection', 'SQL', 'Python', 'OpenCV'],
      icon: <Eye className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-500',
      features: [
        'Real-time face recognition',
        'Automated attendance tracking',
        'Database integration',
        'Admin dashboard'
      ]
    },
    {
      title: 'Gunshot Detection System',
      description: 'A deep learning-based security system that detects gunshots in real-time using TensorFlow for enhanced public safety and emergency response.',
      technologies: ['Deep Learning', 'TensorFlow', 'Audio Processing', 'Python', 'Neural Networks'],
      icon: <Shield className="w-6 h-6" />,
      color: 'from-red-500 to-pink-500',
      features: [
        'Real-time audio analysis',
        'Deep neural networks',
        'Emergency alerts',
        'High accuracy detection'
      ]
    },
    {
      title: 'Customize Products Store',
      description: 'A comprehensive portfolio website showcasing projects and skills, built with modern web technologies and deployed on Vercel.',
      technologies: ['React', 'Node.js', 'CSS', 'JavaScript', 'Vercel'],
      icon: <ShoppingCart className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-500',
      link: 'https://statstyle.vercel.app/home',
      features: [
        'Responsive design',
        'Modern UI/UX',
        'Fast performance',
        'SEO optimized'
      ]
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const stagger = {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
    transition: { staggerChildren: 0.2 }
  };

  const cardVariants = {
    initial: { height: 'auto' },
    expanded: { height: 'auto' }
  };

  return (
    <section id="projects" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions in AI, machine learning, and web development
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 md:grid-cols-2 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={fadeInUp}
              className="relative"
            >
              <motion.div
                variants={cardVariants}
                initial="initial"
                animate="expanded"
                className="overflow-hidden"
              >
                <Card 
                  className="border-0 shadow-lg bg-background"
                  onMouseEnter={() => setActiveCard(index)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${project.color} text-white`}>
                        {project.icon}
                      </div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                    </div>
                  </CardHeader>

                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: activeCard === index ? 'auto' : 0,
                      opacity: activeCard === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="mb-4">
                        <h4 className="font-semibold text-sm">Key Features:</h4>
                        <ul className="space-y-1">
                          {project.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold text-sm">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {project.link && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="mt-4 w-full hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Project
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </motion.div>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        
      </div>
    </section>
  );
};

export default Projects;