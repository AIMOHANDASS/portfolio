import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, Phone, Linkedin, Github, MessageCircle, Send } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import emailjs from 'emailjs-com';
import { useEffect, useState } from 'react';

const Contact = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setIsMobile(/android|iphone|ipad|ipod/.test(ua));
  }, []);

  // 🔹 Submit handler with EmailJS
  const onSubmit = (data: any) => {
    emailjs.send(
      "service_xuj0rbr",   // Replace with your EmailJS Service ID
      "template_39pgdi8",  // Replace with your EmailJS Template ID
      {
        from_name: data.name,
        from_email: data.email,
        subject: data.subject,
        message: data.message
      },
      "wOj0o_RX9OlfmE-8U"    // Replace with your EmailJS Public Key
    ).then(
      () => {
        toast.success("✅ Message sent successfully! Thank you for your mail 🙏");
        reset();
      },
      (error) => {
        toast.error("❌ Failed to send message. Try again later.");
        console.error("EmailJS Error:", error);
      }
    );
  };

  // 🔹 Dynamic Gmail link
  const getGmailLink = () => {
    return isMobile
      ? "mailto:mohan113moha@gmail.com"
      : "https://mail.google.com/mail/?view=cm&fs=1&to=mohan113moha@gmail.com";
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'mohan113moha@gmail.com',
      href: getGmailLink(),
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 8903003808',
      href: 'tel:+918903003808',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'mohan-m1105',
      href: 'https://linkedin.com/in/mohan-m1105',
      color: 'from-blue-600 to-blue-700'
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/AIMOHANDASS',
      href: 'https://github.com/AIMOHANDASS',
      color: 'from-gray-700 to-gray-900'
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
    transition: { staggerChildren: 0.1 }
  };

  return (
    <section id="contact" className="py-20 bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a friendly chat about technology!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div variants={stagger} initial="initial" whileInView="whileInView" viewport={{ once: true }} className="space-y-8">
            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I'd love to hear from you. I typically respond within 24 hours.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {contactInfo.map((item) => (
                <motion.a
                  key={item.label}
                  variants={fadeInUp}
                  href={item.href}
                  target={item.label === "Email" ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md group cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="font-medium text-sm text-muted-foreground">{item.label}</p>
                          <p className="font-semibold group-hover:text-primary transition-colors">{item.value}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Ask a Question Form */}
          <motion.div {...fadeInUp} className="space-y-6">
            <Card className="shadow-lg border-0">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Ask a Question</h3>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name">Name *</label>
                      <input id="name" {...register('name', { required: 'Name is required' })} placeholder="Your full name" className="w-full border rounded p-2" />
                      {errors.name && <p className="text-destructive text-sm">{errors.name.message as string}</p>}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email">Email *</label>
                      <input id="email" type="email" {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email address' } })} placeholder="your.email@example.com" className="w-full border rounded p-2" />
                      {errors.email && <p className="text-destructive text-sm">{errors.email.message as string}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject">Subject *</label>
                    <input id="subject" {...register('subject', { required: 'Subject is required' })} placeholder="What's this about?" className="w-full border rounded p-2" />
                    {errors.subject && <p className="text-destructive text-sm">{errors.subject.message as string}</p>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message">Message *</label>
                    <textarea id="message" {...register('message', { required: 'Message is required' })} placeholder="Type your question..." rows={5} className="w-full border rounded p-2" />
                    {errors.message && <p className="text-destructive text-sm">{errors.message.message as string}</p>}
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
