import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  hover = true, 
  glass = true,
  padding = 'p-6',
  rounded = 'rounded-xl',
  border = true,
  gradient = false,
  shadow = false,
  onClick,
  ...props 
}) => {
  const baseClasses = `
    ${glass ? 'bg-white/10 backdrop-blur-sm' : 'bg-white/5'}
    ${border ? 'border border-white/20' : ''}
    ${padding}
    ${rounded}
    ${shadow ? 'shadow-xl shadow-black/10' : ''}
    ${gradient ? 'bg-gradient-to-br from-white/10 to-white/5' : ''}
    transition-all duration-300
    ${className}
  `;

  const hoverClasses = hover ? {
    whileHover: { 
      scale: 1.02, 
      y: -5,
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    whileTap: { scale: 0.98 }
  } : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={baseClasses.trim()}
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      {...hoverClasses}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Variante spécialisée pour les services/features
export const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features = [],
  badge,
  gradient = "from-blue-500 to-purple-600",
  className = "",
  ...props 
}) => {
  return (
    <Card 
      className={`group relative overflow-hidden ${className}`}
      hover={true}
      {...props}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-4 right-4">
          <div className="bg-gradient-to-r from-green-400 to-emerald-400 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </div>
        </div>
      )}

      {/* Icon */}
      <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Content */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-white/70 leading-relaxed">
          {description}
        </p>

        {/* Features List */}
        {features.length > 0 && (
          <div className="space-y-2 mt-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="flex items-center space-x-2"
              >
                <div className="w-4 h-4 bg-green-400 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-white/80 text-sm">{feature}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Hover Effect Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

// Variante pour les témoignages
export const TestimonialCard = ({ 
  quote, 
  author, 
  role, 
  company,
  avatar,
  rating = 5,
  className = "",
  ...props 
}) => {
  return (
    <Card className={`text-center ${className}`} {...props}>
      {/* Rating */}
      <div className="flex justify-center mb-4">
        {[...Array(rating)].map((_, i) => (
          <motion.svg
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </motion.svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-white/90 italic mb-6 leading-relaxed">
        "{quote}"
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-center space-x-3">
        {avatar && (
          <img 
            src={avatar} 
            alt={author}
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="text-left">
          <div className="text-white font-semibold">{author}</div>
          <div className="text-white/60 text-sm">{role}{company && `, ${company}`}</div>
        </div>
      </div>
    </Card>
  );
};

// Variante pour les statistiques
export const StatCard = ({ 
  value, 
  label, 
  icon: Icon,
  trend,
  trendValue,
  gradient = "from-blue-400 to-purple-400",
  className = "",
  ...props 
}) => {
  return (
    <Card className={`text-center group ${className}`} {...props}>
      {/* Icon */}
      {Icon && (
        <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${gradient} rounded-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}

      {/* Value */}
      <div className="text-3xl font-bold text-white mb-2">
        {value}
      </div>

      {/* Label */}
      <div className="text-white/60 text-sm mb-2">
        {label}
      </div>

      {/* Trend */}
      {trend && trendValue && (
        <div className={`inline-flex items-center space-x-1 text-xs ${
          trend === 'up' ? 'text-green-400' : 'text-red-400'
        }`}>
          <svg 
            className={`w-3 h-3 ${trend === 'down' ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
          </svg>
          <span>{trendValue}</span>
        </div>
      )}
    </Card>
  );
};

export default Card;