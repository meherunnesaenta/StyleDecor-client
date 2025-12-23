const Heading = ({ title, subtitle, center }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-4xl md:text-5xl font-bold text-primary'>{title}</div>
      <div className='text-xl font-light text-neutral-500 mt-2'>{subtitle}</div>
    </div>
  )
}

export default Heading