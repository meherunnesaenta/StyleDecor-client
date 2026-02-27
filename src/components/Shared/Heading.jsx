const Heading = ({ title, subtitle, center = true, className = '' }) => {
  return (
    <div className={`
      ${center ? 'text-center mx-auto' : 'text-left'}
      max-w-4xl
      mb-10 md:mb-14 lg:mb-16
      ${className}
    `}>
      {/* Main Title */}
      <h2 
        className="
          text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
          font-bold 
          tracking-tight 
          leading-tight
          bg-gradient-to-r from-primary via-primary to-secondary 
          bg-clip-text text-transparent
        "
      >
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <p 
          className="
            mt-4 md:mt-5 
            text-lg sm:text-xl md:text-2xl 
            font-light 
            text-base
            leading-relaxed
            max-w-3xl mx-auto
          "
        >
          {subtitle}
        </p>
      )}

      {/* Decorative underline (optional elegant touch) */}
      <div 
        className="
          mt-5 md:mt-6 
          h-1.5 w-24 
          mx-auto 
          bg-gradient-to-r from-primary to-secondary 
          rounded-full
        "
      />
    </div>
  );
};

export default Heading;