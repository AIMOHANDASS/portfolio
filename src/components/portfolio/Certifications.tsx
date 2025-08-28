import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Award, Calendar, Building, BookOpen } from 'lucide-react';



const Certifications = () => {
  const certifications = [
    {
      title: 'IBM Web Development and Design',
      organization: 'IBM',
      date: 'October 2024',
      url: 'https://courses.ibmcep.cognitiveclass.ai/certificates/2553ae56dd714601b2a4857d82d78aa7',
      description: 'Comprehensive certification covering modern web development practices and design principles.',
      skills: ['Web Development', 'Design Principles', 'Frontend Technologies', 'User Experience'],
      icon: <Building className="w-6 h-6" />,
      color: 'from-blue-600 to-blue-800',
      status: 'Completed'
    },
    {
      title: 'Microsoft + SAP TechSaksham Program',
      organization: 'Microsoft & SAP',
      date: '2024-25',
      url: 'https://www.techsaksham.org/verify-certificate-v2/TSPIN25_622000',
      description: 'Industry-focused program combining Microsoft technologies with SAP enterprise solutions.',
      skills: ['Enterprise Solutions', 'Cloud Technologies', 'Digital Transformation', 'Business Applications'],
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-green-600 to-emerald-700',
      status: 'Completed'
    },
    {
      title: 'Privacy & Security in Online Social Media',
      organization: 'NPTEL',
      date: 'April 2025',
      url: 'https://internalapp.nptel.ac.in/noc/Ecertificate/?q=NPTEL25CS79S65870065504483086',
      description: 'Advanced course on cybersecurity, privacy protection, and security best practices in social media.',
      skills: ['Cybersecurity', 'Privacy Protection', 'Social Media Security', 'Digital Ethics'],
      icon: <Award className="w-6 h-6" />,
      color: 'from-purple-600 to-purple-800',
      status: 'Completed'
    },
    {
      title: 'SEO with Squarespace',
      organization: 'Coursera',
      date: 'May 2025',
      url: 'https://coursera.org/share/2f2dcd054b26d7204e8bfaeefc5fdac6',
      description: 'Specialized training in search engine optimization techniques and digital marketing strategies.',
      skills: ['SEO Optimization', 'Digital Marketing', 'Content Strategy', 'Analytics'],
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-orange-600 to-red-600',
      status: 'Completed'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500 text-white';
    
      default:
        return 'bg-gray-500 text-white';
    }
  };

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

  return (
    <section id="certifications" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Learning</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Continuous learning through industry-recognized certifications and programs
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-8"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.title}
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden group">
                <CardContent className="p-6 space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className={`p-3 rounded-lg bg-gradient-to-r ${cert.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                        {cert.icon}
                      </a>
                      <div>
                        <h3 className="font-semibold text-lg leading-tight">
                          <a href={cert.url} target="_blank" rel="noopener noreferrer">{cert.title}</a>
                        </h3>
                        <p className="text-muted-foreground font-medium">{cert.organization}</p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(cert.status)} px-2 py-1 text-xs font-medium`}>
                      {cert.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {cert.date}
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    {cert.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm">Key Skills:</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* ✅ Added Verify Button */}
                  <div className="pt-4">
                    <Button asChild variant="outline" className="text-sm font-semibold">
                      <a href={cert.url} target="_blank" rel="noopener noreferrer">
                        Verify Certificate
                      </a>
                    </Button>
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

export default Certifications;
