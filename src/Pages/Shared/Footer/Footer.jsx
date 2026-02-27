import React from 'react';
import { Link } from 'react-router';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { Logo } from '../../../components/Logo/Logo';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-base-300 text-base-content mt-auto">
            <div className="container mx-auto px-4 py-12">
                {/* Main Footer Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand & Tagline */}
                    <div className="space-y-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo></Logo>
                        </Link>
                        <p className="text-base-content/70 max-w-xs">
                            Transforming homes & ceremonies with elegant, timeless decoration solutions.
                        </p>
                        <p className="text-secondary text-sm">✦ Elegant Living, Beautiful Moments</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold text-primary mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {['Home', 'Services', 'About', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                        className="
                      text-base-content/80 hover:text-primary 
                      transition-colors duration-300 
                      flex items-center gap-3 group
                    "
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-all duration-300" />
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold text-primary mb-6">
                            Contact Us
                        </h4>
                        <ul className="space-y-3 text-base-content/80">
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-secondary" />
                                <span>+880 1234 567 890</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-secondary" />
                                <span>info@styledecor.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-secondary mt-1" />
                                <span>Dhaka, Bangladesh</span>
                            </li>
                        </ul>
                    </div>

                    {/* Working Hours & Social */}
                    <div>
                        <h4 className="text-xl font-playfair font-semibold text-primary mb-6">
                            Hours & Follow Us
                        </h4>
                        <div className="flex items-start gap-3 text-base-content/80 mb-6">
                            <FaClock className="text-secondary mt-1" />
                            <div>
                                <p>Sat - Thu: 9:00 AM - 8:00 PM</p>
                                <p>Friday: Closed</p>
                            </div>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaFacebookF size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaInstagram size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaTwitter size={20} />
                            </a>
                            <a href="#" className="bg-base-100 p-3 rounded-full hover:bg-secondary hover:text-white transition-all">
                                <FaLinkedinIn size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-center my-8">
                    <div className="border-t border-primary/20 w-32"></div>
                    <span className="mx-4 text-primary/40 text-2xl">✦</span>
                    <div className="border-t border-primary/20 w-32"></div>
                </div>

                {/* Copyright */}
                <div className="text-center text-base-content/60 text-sm">
                    © {currentYear} StyleDecor. All rights reserved. Crafted with elegance.
                </div>
            </div>
        </footer>
    );
};

export default Footer;