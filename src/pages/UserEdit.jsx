import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const edit = () =>
{
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
}