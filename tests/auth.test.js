import { expect, request } from 'chai';
import app from '../src/app';
import { generateRefreshToken } from '../src/helpers/jwtFunction.js';

let token = '';
const bToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OSwiaWF0IjoxNjQ3MzY1NTQwLCJleHAiOjE2NDc0NTE5NDB9.f_MRlA12fx7nQw7BsEJgY5WZWRAq1Na9s4b28OcWvrE';


