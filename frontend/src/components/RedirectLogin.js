import React from 'react';
import { Navigate } from 'react-router';

export default function redirectLogin() {
  return <Navigate to="/signin"> </Navigate>;
}
