import PropTypes from 'prop-types';
import React from 'react';
import { cn } from '../lib/utils';

const getVariantClass = (variantName : string) => {
  const variant = variants.find(v => v.name === variantName);
  return variant ? variant.color : '';
};

const variants = [
  { name: 'primary', color: 'bg-pink-800 text-pink-100 hover:bg-pink-900' },
  { name: 'secondary', color: 'bg-pink-400 text-pink-900 hover:bg-pink-500' },
  { name: 'success', color: 'bg-green-500 text-white hover:bg-green-600' },
  { name: 'danger', color: 'bg-red-500 text-white hover:bg-red-600' },
  { name: 'warning', color: 'bg-yellow-400 text-black hover:bg-yellow-500' },
  { name: 'info', color: 'bg-blue-300 text-black hover:bg-blue-400' },
];

export const Button = ({ children, onClick, icon, variant, className }) => {
  
  return (
    <button 
      type="button"
      onClick={onClick}
      className={cn(getVariantClass(variant), className, 'flex flex-row items-center gap-4 px-2 py-2 text-lg rounded-2xl shadow-2xl font-bold')}
    >
      {icon && <img src={icon}></img>}
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info']),
};
