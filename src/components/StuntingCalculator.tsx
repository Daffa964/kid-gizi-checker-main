import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useToast } from '@/hooks/use-toast';

// Data standar WHO untuk TB/U (Tinggi Badan menurut Umur) - Stunting
const standarTBU = {
  'laki-laki': [
    { bulan: 0, min3sd: 44.2, min2sd: 46.1, median: 49.9, plus2sd: 53.7, plus3sd: 55.6 },
    { bulan: 1, min3sd: 48.9, min2sd: 50.8, median: 54.7, plus2sd: 58.6, plus3sd: 60.5 },
    { bulan: 2, min3sd: 52.4, min2sd: 54.4, median: 58.4, plus2sd: 62.4, plus3sd: 64.4 },
    { bulan: 3, min3sd: 55.3, min2sd: 57.3, median: 61.4, plus2sd: 65.5, plus3sd: 67.6 },
    { bulan: 4, min3sd: 57.6, min2sd: 59.7, median: 63.9, plus2sd: 68.0, plus3sd: 70.1 },
    { bulan: 5, min3sd: 59.6, min2sd: 61.7, median: 65.9, plus2sd: 70.1, plus3sd: 72.2 },
    { bulan: 6, min3sd: 61.2, min2sd: 63.3, median: 67.6, plus2sd: 71.9, plus3sd: 74.0 },
    { bulan: 7, min3sd: 62.7, min2sd: 64.8, median: 69.2, plus2sd: 73.5, plus3sd: 75.7 },
    { bulan: 8, min3sd: 64.0, min2sd: 66.2, median: 70.6, plus2sd: 75.0, plus3sd: 77.2 },
    { bulan: 9, min3sd: 65.2, min2sd: 67.5, median: 72.0, plus2sd: 76.5, plus3sd: 78.7 },
    { bulan: 10, min3sd: 66.4, min2sd: 68.7, median: 73.3, plus2sd: 77.9, plus3sd: 80.1 },
    { bulan: 11, min3sd: 67.6, min2sd: 69.9, median: 74.5, plus2sd: 79.2, plus3sd: 81.5 },
    { bulan: 12, min3sd: 68.6, min2sd: 71.0, median: 75.7, plus2sd: 80.5, plus3sd: 82.9 },
    { bulan: 13, min3sd: 69.6, min2sd: 72.1, median: 76.9, plus2sd: 81.8, plus3sd: 84.2 },
    { bulan: 14, min3sd: 70.6, min2sd: 73.1, median: 78.0, plus2sd: 83.0, plus3sd: 85.5 },
    { bulan: 15, min3sd: 71.6, min2sd: 74.1, median: 79.1, plus2sd: 84.2, plus3sd: 86.7 },
    { bulan: 16, min3sd: 72.5, min2sd: 75.0, median: 80.2, plus2sd: 85.4, plus3sd: 88.0 },
    { bulan: 17, min3sd: 73.3, min2sd: 75.9, median: 81.2, plus2sd: 86.5, plus3sd: 89.2 },
    { bulan: 18, min3sd: 74.2, min2sd: 76.8, median: 82.3, plus2sd: 87.7, plus3sd: 90.4 },
    { bulan: 19, min3sd: 75.0, min2sd: 77.7, median: 83.2, plus2sd: 88.8, plus3sd: 91.5 },
    { bulan: 20, min3sd: 75.8, min2sd: 78.5, median: 84.2, plus2sd: 89.8, plus3sd: 92.6 },
    { bulan: 21, min3sd: 76.5, min2sd: 79.3, median: 85.1, plus2sd: 90.9, plus3sd: 93.8 },
    { bulan: 22, min3sd: 77.2, min2sd: 80.0, median: 86.0, plus2sd: 91.9, plus3sd: 94.9 },
    { bulan: 23, min3sd: 78.0, min2sd: 80.8, median: 86.9, plus2sd: 92.9, plus3sd: 95.9 },
    { bulan: 24, min3sd: 78.7, min2sd: 81.5, median: 87.8, plus2sd: 93.9, plus3sd: 97.0 },
    { bulan: 25, min3sd: 79.3, min2sd: 82.2, median: 88.7, plus2sd: 94.9, plus3sd: 98.0 },
    { bulan: 26, min3sd: 80.0, min2sd: 82.9, median: 89.6, plus2sd: 95.9, plus3sd: 99.0 },
    { bulan: 27, min3sd: 80.7, min2sd: 83.6, median: 90.4, plus2sd: 96.8, plus3sd: 100.0 },
    { bulan: 28, min3sd: 81.3, min2sd: 84.3, median: 91.3, plus2sd: 97.7, plus3sd: 101.0 },
    { bulan: 29, min3sd: 81.9, min2sd: 84.9, median: 92.1, plus2sd: 98.7, plus3sd: 101.9 },
    { bulan: 30, min3sd: 82.5, min2sd: 85.5, median: 92.9, plus2sd: 99.6, plus3sd: 102.9 },
    { bulan: 31, min3sd: 83.1, min2sd: 86.2, median: 93.7, plus2sd: 100.5, plus3sd: 103.8 },
    { bulan: 32, min3sd: 83.6, min2sd: 86.8, median: 94.4, plus2sd: 101.4, plus3sd: 104.8 },
    { bulan: 33, min3sd: 84.2, min2sd: 87.4, median: 95.2, plus2sd: 102.3, plus3sd: 105.7 },
    { bulan: 34, min3sd: 84.7, min2sd: 88.0, median: 95.9, plus2sd: 103.2, plus3sd: 106.6 },
    { bulan: 35, min3sd: 85.3, min2sd: 88.6, median: 96.7, plus2sd: 104.1, plus3sd: 107.5 },
    { bulan: 36, min3sd: 85.8, min2sd: 89.2, median: 97.4, plus2sd: 104.9, plus3sd: 108.4 },
    { bulan: 37, min3sd: 86.3, min2sd: 89.8, median: 98.1, plus2sd: 105.8, plus3sd: 109.3 },
    { bulan: 38, min3sd: 86.8, min2sd: 90.3, median: 98.8, plus2sd: 106.6, plus3sd: 110.1 },
    { bulan: 39, min3sd: 87.3, min2sd: 90.9, median: 99.5, plus2sd: 107.5, plus3sd: 111.0 },
    { bulan: 40, min3sd: 87.8, min2sd: 91.4, median: 100.2, plus2sd: 108.3, plus3sd: 111.8 },
    { bulan: 41, min3sd: 88.3, min2sd: 91.9, median: 100.9, plus2sd: 109.1, plus3sd: 112.7 },
    { bulan: 42, min3sd: 88.7, min2sd: 92.4, median: 101.6, plus2sd: 109.9, plus3sd: 113.5 },
    { bulan: 43, min3sd: 89.2, min2sd: 93.0, median: 102.3, plus2sd: 110.7, plus3sd: 114.3 },
    { bulan: 44, min3sd: 89.7, min2sd: 93.5, median: 102.9, plus2sd: 111.5, plus3sd: 115.1 },
    { bulan: 45, min3sd: 90.1, min2sd: 94.0, median: 103.6, plus2sd: 112.3, plus3sd: 115.9 },
    { bulan: 46, min3sd: 90.6, min2sd: 94.5, median: 104.3, plus2sd: 113.1, plus3sd: 116.7 },
    { bulan: 47, min3sd: 91.0, min2sd: 95.0, median: 104.9, plus2sd: 113.9, plus3sd: 117.4 },
    { bulan: 48, min3sd: 91.4, min2sd: 95.4, median: 105.6, plus2sd: 114.6, plus3sd: 118.2 },
    { bulan: 49, min3sd: 91.9, min2sd: 95.9, median: 106.2, plus2sd: 115.4, plus3sd: 119.0 },
    { bulan: 50, min3sd: 92.3, min2sd: 96.4, median: 106.9, plus2sd: 116.1, plus3sd: 119.7 },
    { bulan: 51, min3sd: 92.7, min2sd: 96.8, median: 107.5, plus2sd: 116.9, plus3sd: 120.5 },
    { bulan: 52, min3sd: 93.1, min2sd: 97.3, median: 108.1, plus2sd: 117.6, plus3sd: 121.2 },
    { bulan: 53, min3sd: 93.5, min2sd: 97.7, median: 108.8, plus2sd: 118.3, plus3sd: 121.9 },
    { bulan: 54, min3sd: 93.9, min2sd: 98.2, median: 109.4, plus2sd: 119.0, plus3sd: 122.6 },
    { bulan: 55, min3sd: 94.3, min2sd: 98.6, median: 110.0, plus2sd: 119.8, plus3sd: 123.4 },
    { bulan: 56, min3sd: 94.7, min2sd: 99.0, median: 110.6, plus2sd: 120.5, plus3sd: 124.1 },
    { bulan: 57, min3sd: 95.1, min2sd: 99.5, median: 111.2, plus2sd: 121.2, plus3sd: 124.8 },
    { bulan: 58, min3sd: 95.5, min2sd: 99.9, median: 111.8, plus2sd: 121.9, plus3sd: 125.5 },
    { bulan: 59, min3sd: 95.9, min2sd: 100.3, median: 112.4, plus2sd: 122.6, plus3sd: 126.2 },
    { bulan: 60, min3sd: 96.3, min2sd: 100.7, median: 113.0, plus2sd: 123.3, plus3sd: 126.9 }
  ],
  'perempuan': [
    { bulan: 0, min3sd: 43.6, min2sd: 45.4, median: 49.1, plus2sd: 52.9, plus3sd: 54.7 },
    { bulan: 1, min3sd: 47.8, min2sd: 49.8, median: 53.7, plus2sd: 57.6, plus3sd: 59.5 },
    { bulan: 2, min3sd: 51.0, min2sd: 53.0, median: 57.1, plus2sd: 61.1, plus3sd: 63.2 },
    { bulan: 3, min3sd: 53.5, min2sd: 55.6, median: 59.8, plus2sd: 64.0, plus3sd: 66.1 },
    { bulan: 4, min3sd: 55.6, min2sd: 57.8, median: 62.1, plus2sd: 66.4, plus3sd: 68.6 },
    { bulan: 5, min3sd: 57.4, min2sd: 59.6, median: 64.0, plus2sd: 68.5, plus3sd: 70.7 },
    { bulan: 6, min3sd: 58.9, min2sd: 61.2, median: 65.7, plus2sd: 70.3, plus3sd: 72.5 },
    { bulan: 7, min3sd: 60.3, min2sd: 62.7, median: 67.3, plus2sd: 71.9, plus3sd: 74.2 },
    { bulan: 8, min3sd: 61.7, min2sd: 64.0, median: 68.7, plus2sd: 73.5, plus3sd: 75.8 },
    { bulan: 9, min3sd: 62.9, min2sd: 65.3, median: 70.1, plus2sd: 75.0, plus3sd: 77.4 },
    { bulan: 10, min3sd: 64.1, min2sd: 66.5, median: 71.5, plus2sd: 76.4, plus3sd: 78.9 },
    { bulan: 11, min3sd: 65.2, min2sd: 67.7, median: 72.8, plus2sd: 77.8, plus3sd: 80.3 },
    { bulan: 12, min3sd: 66.3, min2sd: 68.9, median: 74.0, plus2sd: 79.2, plus3sd: 81.7 },
    { bulan: 13, min3sd: 67.3, min2sd: 70.0, median: 75.2, plus2sd: 80.5, plus3sd: 83.1 },
    { bulan: 14, min3sd: 68.3, min2sd: 71.0, median: 76.4, plus2sd: 81.7, plus3sd: 84.4 },
    { bulan: 15, min3sd: 69.3, min2sd: 72.0, median: 77.5, plus2sd: 83.0, plus3sd: 85.7 },
    { bulan: 16, min3sd: 70.2, min2sd: 73.0, median: 78.6, plus2sd: 84.2, plus3sd: 87.0 },
    { bulan: 17, min3sd: 71.1, min2sd: 74.0, median: 79.7, plus2sd: 85.4, plus3sd: 88.2 },
    { bulan: 18, min3sd: 72.0, min2sd: 74.9, median: 80.7, plus2sd: 86.5, plus3sd: 89.4 },
    { bulan: 19, min3sd: 72.8, min2sd: 75.8, median: 81.7, plus2sd: 87.6, plus3sd: 90.6 },
    { bulan: 20, min3sd: 73.7, min2sd: 76.7, median: 82.7, plus2sd: 88.7, plus3sd: 91.7 },
    { bulan: 21, min3sd: 74.5, min2sd: 77.5, median: 83.7, plus2sd: 89.8, plus3sd: 92.9 },
    { bulan: 22, min3sd: 75.2, min2sd: 78.4, median: 84.6, plus2sd: 90.8, plus3sd: 94.0 },
    { bulan: 23, min3sd: 76.0, min2sd: 79.2, median: 85.5, plus2sd: 91.9, plus3sd: 95.0 },
    { bulan: 24, min3sd: 76.7, min2sd: 80.0, median: 86.4, plus2sd: 92.9, plus3sd: 96.1 },
    { bulan: 25, min3sd: 77.5, min2sd: 80.8, median: 87.3, plus2sd: 93.9, plus3sd: 97.1 },
    { bulan: 26, min3sd: 78.2, min2sd: 81.5, median: 88.2, plus2sd: 94.9, plus3sd: 98.1 },
    { bulan: 27, min3sd: 78.9, min2sd: 82.3, median: 89.1, plus2sd: 95.9, plus3sd: 99.1 },
    { bulan: 28, min3sd: 79.6, min2sd: 83.0, median: 89.9, plus2sd: 96.9, plus3sd: 100.1 },
    { bulan: 29, min3sd: 80.3, min2sd: 83.7, median: 90.8, plus2sd: 97.8, plus3sd: 101.1 },
    { bulan: 30, min3sd: 80.9, min2sd: 84.4, median: 91.6, plus2sd: 98.8, plus3sd: 102.0 },
    { bulan: 31, min3sd: 81.6, min2sd: 85.1, median: 92.4, plus2sd: 99.7, plus3sd: 103.0 },
    { bulan: 32, min3sd: 82.2, min2sd: 85.8, median: 93.2, plus2sd: 100.6, plus3sd: 103.9 },
    { bulan: 33, min3sd: 82.8, min2sd: 86.4, median: 94.0, plus2sd: 101.5, plus3sd: 104.8 },
    { bulan: 34, min3sd: 83.4, min2sd: 87.1, median: 94.8, plus2sd: 102.4, plus3sd: 105.7 },
    { bulan: 35, min3sd: 84.0, min2sd: 87.7, median: 95.6, plus2sd: 103.3, plus3sd: 106.6 },
    { bulan: 36, min3sd: 84.6, min2sd: 88.4, median: 96.3, plus2sd: 104.2, plus3sd: 107.5 },
    { bulan: 37, min3sd: 85.2, min2sd: 89.0, median: 97.1, plus2sd: 105.0, plus3sd: 108.4 },
    { bulan: 38, min3sd: 85.7, min2sd: 89.6, median: 97.8, plus2sd: 105.9, plus3sd: 109.3 },
    { bulan: 39, min3sd: 86.3, min2sd: 90.2, median: 98.5, plus2sd: 106.7, plus3sd: 110.1 },
    { bulan: 40, min3sd: 86.8, min2sd: 90.8, median: 99.3, plus2sd: 107.5, plus3sd: 111.0 },
    { bulan: 41, min3sd: 87.4, min2sd: 91.4, median: 100.0, plus2sd: 108.3, plus3sd: 111.8 },
    { bulan: 42, min3sd: 87.9, min2sd: 92.0, median: 100.7, plus2sd: 109.1, plus3sd: 112.6 },
    { bulan: 43, min3sd: 88.4, min2sd: 92.5, median: 101.4, plus2sd: 109.9, plus3sd: 113.5 },
    { bulan: 44, min3sd: 88.9, min2sd: 93.1, median: 102.0, plus2sd: 110.7, plus3sd: 114.3 },
    { bulan: 45, min3sd: 89.4, min2sd: 93.6, median: 102.7, plus2sd: 111.5, plus3sd: 115.1 },
    { bulan: 46, min3sd: 89.9, min2sd: 94.2, median: 103.4, plus2sd: 112.2, plus3sd: 115.9 },
    { bulan: 47, min3sd: 90.4, min2sd: 94.7, median: 104.0, plus2sd: 113.0, plus3sd: 116.7 },
    { bulan: 48, min3sd: 90.9, min2sd: 95.2, median: 104.7, plus2sd: 113.8, plus3sd: 117.4 },
    { bulan: 49, min3sd: 91.4, min2sd: 95.8, median: 105.3, plus2sd: 114.5, plus3sd: 118.2 },
    { bulan: 50, min3sd: 91.8, min2sd: 96.3, median: 106.0, plus2sd: 115.3, plus3sd: 119.0 },
    { bulan: 51, min3sd: 92.3, min2sd: 96.8, median: 106.6, plus2sd: 116.0, plus3sd: 119.7 },
    { bulan: 52, min3sd: 92.8, min2sd: 97.3, median: 107.2, plus2sd: 116.7, plus3sd: 120.4 },
    { bulan: 53, min3sd: 93.2, min2sd: 97.8, median: 107.9, plus2sd: 117.4, plus3sd: 121.2 },
    { bulan: 54, min3sd: 93.7, min2sd: 98.3, median: 108.5, plus2sd: 118.2, plus3sd: 121.9 },
    { bulan: 55, min3sd: 94.1, min2sd: 98.7, median: 109.1, plus2sd: 118.9, plus3sd: 122.6 },
    { bulan: 56, min3sd: 94.6, min2sd: 99.2, median: 109.7, plus2sd: 119.6, plus3sd: 123.3 },
    { bulan: 57, min3sd: 95.0, min2sd: 99.7, median: 110.3, plus2sd: 120.3, plus3sd: 124.0 },
    { bulan: 58, min3sd: 95.4, min2sd: 100.1, median: 110.9, plus2sd: 121.0, plus3sd: 124.7 },
    { bulan: 59, min3sd: 95.9, min2sd: 100.6, median: 111.5, plus2sd: 121.7, plus3sd: 125.4 },
    { bulan: 60, min3sd: 96.3, min2sd: 101.0, median: 112.1, plus2sd: 122.4, plus3sd: 126.1 }
  ]
};

// Data standar WHO untuk BB/U (Berat Badan menurut Umur) - Underweight
const standarBBU = {
  'laki-laki': [
    { bulan: 0, min3sd: 2.1, min2sd: 2.5, median: 3.3, plus2sd: 4.4, plus3sd: 5.1 },
    { bulan: 1, min3sd: 2.9, min2sd: 3.4, median: 4.5, plus2sd: 5.8, plus3sd: 6.6 },
    { bulan: 2, min3sd: 3.8, min2sd: 4.3, median: 5.6, plus2sd: 7.1, plus3sd: 8.0 },
    { bulan: 3, min3sd: 4.4, min2sd: 5.0, median: 6.4, plus2sd: 8.0, plus3sd: 9.0 },
    { bulan: 4, min3sd: 4.9, min2sd: 5.6, median: 7.0, plus2sd: 8.7, plus3sd: 9.7 },
    { bulan: 5, min3sd: 5.3, min2sd: 6.0, median: 7.5, plus2sd: 9.3, plus3sd: 10.4 },
    { bulan: 6, min3sd: 5.7, min2sd: 6.4, median: 7.9, plus2sd: 9.8, plus3sd: 10.9 },
    { bulan: 7, min3sd: 5.9, min2sd: 6.7, median: 8.3, plus2sd: 10.3, plus3sd: 11.4 },
    { bulan: 8, min3sd: 6.2, min2sd: 6.9, median: 8.6, plus2sd: 10.7, plus3sd: 11.9 },
    { bulan: 9, min3sd: 6.4, min2sd: 7.1, median: 8.9, plus2sd: 11.0, plus3sd: 12.3 },
    { bulan: 10, min3sd: 6.6, min2sd: 7.4, median: 9.2, plus2sd: 11.4, plus3sd: 12.7 },
    { bulan: 11, min3sd: 6.8, min2sd: 7.6, median: 9.4, plus2sd: 11.7, plus3sd: 13.0 },
    { bulan: 12, min3sd: 7.0, min2sd: 7.7, median: 9.6, plus2sd: 12.0, plus3sd: 13.3 },
    { bulan: 13, min3sd: 7.1, min2sd: 7.9, median: 9.9, plus2sd: 12.3, plus3sd: 13.7 },
    { bulan: 14, min3sd: 7.3, min2sd: 8.1, median: 10.1, plus2sd: 12.6, plus3sd: 14.0 },
    { bulan: 15, min3sd: 7.4, min2sd: 8.3, median: 10.3, plus2sd: 12.8, plus3sd: 14.3 },
    { bulan: 16, min3sd: 7.5, min2sd: 8.4, median: 10.5, plus2sd: 13.1, plus3sd: 14.6 },
    { bulan: 17, min3sd: 7.7, min2sd: 8.6, median: 10.7, plus2sd: 13.4, plus3sd: 14.9 },
    { bulan: 18, min3sd: 7.8, min2sd: 8.8, median: 10.9, plus2sd: 13.7, plus3sd: 15.3 },
    { bulan: 19, min3sd: 8.0, min2sd: 8.9, median: 11.1, plus2sd: 13.9, plus3sd: 15.6 },
    { bulan: 20, min3sd: 8.1, min2sd: 9.1, median: 11.3, plus2sd: 14.2, plus3sd: 15.9 },
    { bulan: 21, min3sd: 8.2, min2sd: 9.2, median: 11.5, plus2sd: 14.5, plus3sd: 16.2 },
    { bulan: 22, min3sd: 8.4, min2sd: 9.4, median: 11.8, plus2sd: 14.7, plus3sd: 16.5 },
    { bulan: 23, min3sd: 8.5, min2sd: 9.5, median: 12.0, plus2sd: 15.0, plus3sd: 16.8 },
    { bulan: 24, min3sd: 8.6, min2sd: 9.7, median: 12.2, plus2sd: 15.3, plus3sd: 17.1 },
    { bulan: 25, min3sd: 8.8, min2sd: 9.8, median: 12.4, plus2sd: 15.5, plus3sd: 17.5 },
    { bulan: 26, min3sd: 8.9, min2sd: 10.0, median: 12.5, plus2sd: 15.8, plus3sd: 17.8 },
    { bulan: 27, min3sd: 9.0, min2sd: 10.1, median: 12.7, plus2sd: 16.1, plus3sd: 18.1 },
    { bulan: 28, min3sd: 9.1, min2sd: 10.2, median: 12.9, plus2sd: 16.3, plus3sd: 18.4 },
    { bulan: 29, min3sd: 9.2, min2sd: 10.4, median: 13.1, plus2sd: 16.6, plus3sd: 18.7 },
    { bulan: 30, min3sd: 9.4, min2sd: 10.5, median: 13.3, plus2sd: 16.9, plus3sd: 19.0 },
    { bulan: 31, min3sd: 9.5, min2sd: 10.7, median: 13.5, plus2sd: 17.1, plus3sd: 19.3 },
    { bulan: 32, min3sd: 9.6, min2sd: 10.8, median: 13.7, plus2sd: 17.4, plus3sd: 19.6 },
    { bulan: 33, min3sd: 9.7, min2sd: 10.9, median: 13.8, plus2sd: 17.7, plus3sd: 19.9 },
    { bulan: 34, min3sd: 9.8, min2sd: 11.0, median: 14.0, plus2sd: 17.9, plus3sd: 20.2 },
    { bulan: 35, min3sd: 9.9, min2sd: 11.2, median: 14.2, plus2sd: 18.2, plus3sd: 20.5 },
    { bulan: 36, min3sd: 10.0, min2sd: 11.3, median: 14.3, plus2sd: 18.4, plus3sd: 20.8 },
    { bulan: 37, min3sd: 10.1, min2sd: 11.4, median: 14.5, plus2sd: 18.7, plus3sd: 21.1 },
    { bulan: 38, min3sd: 10.2, min2sd: 11.5, median: 14.7, plus2sd: 18.9, plus3sd: 21.4 },
    { bulan: 39, min3sd: 10.3, min2sd: 11.6, median: 14.8, plus2sd: 19.2, plus3sd: 21.7 },
    { bulan: 40, min3sd: 10.4, min2sd: 11.8, median: 15.0, plus2sd: 19.4, plus3sd: 22.0 },
    { bulan: 41, min3sd: 10.5, min2sd: 11.9, median: 15.2, plus2sd: 19.7, plus3sd: 22.3 },
    { bulan: 42, min3sd: 10.6, min2sd: 12.0, median: 15.3, plus2sd: 19.9, plus3sd: 22.5 },
    { bulan: 43, min3sd: 10.7, min2sd: 12.1, median: 15.5, plus2sd: 20.2, plus3sd: 22.8 },
    { bulan: 44, min3sd: 10.8, min2sd: 12.2, median: 15.7, plus2sd: 20.4, plus3sd: 23.1 },
    { bulan: 45, min3sd: 10.9, min2sd: 12.4, median: 15.8, plus2sd: 20.7, plus3sd: 23.4 },
    { bulan: 46, min3sd: 11.0, min2sd: 12.5, median: 16.0, plus2sd: 20.9, plus3sd: 23.7 },
    { bulan: 47, min3sd: 11.1, min2sd: 12.6, median: 16.2, plus2sd: 21.2, plus3sd: 24.0 },
    { bulan: 48, min3sd: 11.2, min2sd: 12.7, median: 16.3, plus2sd: 21.4, plus3sd: 24.2 },
    { bulan: 49, min3sd: 11.3, min2sd: 12.8, median: 16.5, plus2sd: 21.7, plus3sd: 24.5 },
    { bulan: 50, min3sd: 11.4, min2sd: 12.9, median: 16.7, plus2sd: 21.9, plus3sd: 24.8 },
    { bulan: 51, min3sd: 11.5, min2sd: 13.1, median: 16.8, plus2sd: 22.2, plus3sd: 25.1 },
    { bulan: 52, min3sd: 11.6, min2sd: 13.2, median: 17.0, plus2sd: 22.4, plus3sd: 25.4 },
    { bulan: 53, min3sd: 11.7, min2sd: 13.3, median: 17.2, plus2sd: 22.7, plus3sd: 25.7 },
    { bulan: 54, min3sd: 11.8, min2sd: 13.4, median: 17.3, plus2sd: 22.9, plus3sd: 25.9 },
    { bulan: 55, min3sd: 11.9, min2sd: 13.5, median: 17.5, plus2sd: 23.2, plus3sd: 26.2 },
    { bulan: 56, min3sd: 12.0, min2sd: 13.6, median: 17.7, plus2sd: 23.4, plus3sd: 26.5 },
    { bulan: 57, min3sd: 12.1, min2sd: 13.7, median: 17.8, plus2sd: 23.7, plus3sd: 26.8 },
    { bulan: 58, min3sd: 12.2, min2sd: 13.8, median: 18.0, plus2sd: 23.9, plus3sd: 27.1 },
    { bulan: 59, min3sd: 12.3, min2sd: 14.0, median: 18.2, plus2sd: 24.2, plus3sd: 27.4 },
    { bulan: 60, min3sd: 12.4, min2sd: 14.1, median: 18.3, plus2sd: 24.4, plus3sd: 27.6 }
  ],
  'perempuan': [
    { bulan: 0, min3sd: 2.0, min2sd: 2.4, median: 3.2, plus2sd: 4.2, plus3sd: 4.8 },
    { bulan: 1, min3sd: 2.7, min2sd: 3.2, median: 4.2, plus2sd: 5.5, plus3sd: 6.2 },
    { bulan: 2, min3sd: 3.4, min2sd: 3.9, median: 5.1, plus2sd: 6.6, plus3sd: 7.5 },
    { bulan: 3, min3sd: 4.0, min2sd: 4.5, median: 5.8, plus2sd: 7.5, plus3sd: 8.5 },
    { bulan: 4, min3sd: 4.4, min2sd: 5.0, median: 6.4, plus2sd: 8.2, plus3sd: 9.3 },
    { bulan: 5, min3sd: 4.8, min2sd: 5.4, median: 6.9, plus2sd: 8.8, plus3sd: 10.0 },
    { bulan: 6, min3sd: 5.1, min2sd: 5.7, median: 7.3, plus2sd: 9.3, plus3sd: 10.6 },
    { bulan: 7, min3sd: 5.3, min2sd: 6.0, median: 7.6, plus2sd: 9.8, plus3sd: 11.1 },
    { bulan: 8, min3sd: 5.6, min2sd: 6.3, median: 7.9, plus2sd: 10.2, plus3sd: 11.6 },
    { bulan: 9, min3sd: 5.8, min2sd: 6.5, median: 8.2, plus2sd: 10.5, plus3sd: 12.0 },
    { bulan: 10, min3sd: 5.9, min2sd: 6.7, median: 8.5, plus2sd: 10.9, plus3sd: 12.4 },
    { bulan: 11, min3sd: 6.1, min2sd: 6.9, median: 8.7, plus2sd: 11.2, plus3sd: 12.8 },
    { bulan: 12, min3sd: 6.3, min2sd: 7.0, median: 8.9, plus2sd: 11.5, plus3sd: 13.1 },
    { bulan: 13, min3sd: 6.4, min2sd: 7.2, median: 9.2, plus2sd: 11.8, plus3sd: 13.5 },
    { bulan: 14, min3sd: 6.6, min2sd: 7.4, median: 9.4, plus2sd: 12.1, plus3sd: 13.8 },
    { bulan: 15, min3sd: 6.7, min2sd: 7.5, median: 9.6, plus2sd: 12.4, plus3sd: 14.1 },
    { bulan: 16, min3sd: 6.9, min2sd: 7.7, median: 9.8, plus2sd: 12.6, plus3sd: 14.5 },
    { bulan: 17, min3sd: 7.0, min2sd: 7.8, median: 10.0, plus2sd: 12.9, plus3sd: 14.8 },
    { bulan: 18, min3sd: 7.2, min2sd: 8.0, median: 10.2, plus2sd: 13.2, plus3sd: 15.1 },
    { bulan: 19, min3sd: 7.3, min2sd: 8.1, median: 10.4, plus2sd: 13.5, plus3sd: 15.4 },
    { bulan: 20, min3sd: 7.5, min2sd: 8.3, median: 10.6, plus2sd: 13.7, plus3sd: 15.7 },
    { bulan: 21, min3sd: 7.6, min2sd: 8.4, median: 10.9, plus2sd: 14.0, plus3sd: 16.0 },
    { bulan: 22, min3sd: 7.8, min2sd: 8.6, median: 11.1, plus2sd: 14.3, plus3sd: 16.4 },
    { bulan: 23, min3sd: 7.9, min2sd: 8.7, median: 11.3, plus2sd: 14.6, plus3sd: 16.7 },
    { bulan: 24, min3sd: 8.1, min2sd: 8.9, median: 11.5, plus2sd: 14.8, plus3sd: 17.0 },
    { bulan: 25, min3sd: 8.2, min2sd: 9.0, median: 11.7, plus2sd: 15.1, plus3sd: 17.3 },
    { bulan: 26, min3sd: 8.3, min2sd: 9.2, median: 11.9, plus2sd: 15.4, plus3sd: 17.6 },
    { bulan: 27, min3sd: 8.5, min2sd: 9.3, median: 12.1, plus2sd: 15.7, plus3sd: 17.9 },
    { bulan: 28, min3sd: 8.6, min2sd: 9.4, median: 12.3, plus2sd: 15.9, plus3sd: 18.2 },
    { bulan: 29, min3sd: 8.7, min2sd: 9.6, median: 12.5, plus2sd: 16.2, plus3sd: 18.6 },
    { bulan: 30, min3sd: 8.9, min2sd: 9.7, median: 12.7, plus2sd: 16.5, plus3sd: 18.9 },
    { bulan: 31, min3sd: 9.0, min2sd: 9.9, median: 12.9, plus2sd: 16.7, plus3sd: 19.2 },
    { bulan: 32, min3sd: 9.1, min2sd: 10.0, median: 13.1, plus2sd: 17.0, plus3sd: 19.5 },
    { bulan: 33, min3sd: 9.2, min2sd: 10.1, median: 13.3, plus2sd: 17.3, plus3sd: 19.8 },
    { bulan: 34, min3sd: 9.4, min2sd: 10.3, median: 13.5, plus2sd: 17.5, plus3sd: 20.1 },
    { bulan: 35, min3sd: 9.5, min2sd: 10.4, median: 13.7, plus2sd: 17.8, plus3sd: 20.4 },
    { bulan: 36, min3sd: 9.6, min2sd: 10.5, median: 13.9, plus2sd: 18.1, plus3sd: 20.7 },
    { bulan: 37, min3sd: 9.7, min2sd: 10.7, median: 14.0, plus2sd: 18.3, plus3sd: 21.0 },
    { bulan: 38, min3sd: 9.8, min2sd: 10.8, median: 14.2, plus2sd: 18.6, plus3sd: 21.3 },
    { bulan: 39, min3sd: 9.9, min2sd: 10.9, median: 14.4, plus2sd: 18.9, plus3sd: 21.6 },
    { bulan: 40, min3sd: 10.1, min2sd: 11.0, median: 14.6, plus2sd: 19.1, plus3sd: 21.9 },
    { bulan: 41, min3sd: 10.2, min2sd: 11.2, median: 14.8, plus2sd: 19.4, plus3sd: 22.2 },
    { bulan: 42, min3sd: 10.3, min2sd: 11.3, median: 15.0, plus2sd: 19.7, plus3sd: 22.5 },
    { bulan: 43, min3sd: 10.4, min2sd: 11.4, median: 15.2, plus2sd: 19.9, plus3sd: 22.8 },
    { bulan: 44, min3sd: 10.5, min2sd: 11.5, median: 15.3, plus2sd: 20.2, plus3sd: 23.1 },
    { bulan: 45, min3sd: 10.6, min2sd: 11.7, median: 15.5, plus2sd: 20.5, plus3sd: 23.4 },
    { bulan: 46, min3sd: 10.7, min2sd: 11.8, median: 15.7, plus2sd: 20.7, plus3sd: 23.7 },
    { bulan: 47, min3sd: 10.8, min2sd: 11.9, median: 15.9, plus2sd: 21.0, plus3sd: 24.0 },
    { bulan: 48, min3sd: 10.9, min2sd: 12.0, median: 16.1, plus2sd: 21.2, plus3sd: 24.3 },
    { bulan: 49, min3sd: 11.0, min2sd: 12.1, median: 16.3, plus2sd: 21.5, plus3sd: 24.6 },
    { bulan: 50, min3sd: 11.1, min2sd: 12.3, median: 16.4, plus2sd: 21.8, plus3sd: 24.9 },
    { bulan: 51, min3sd: 11.2, min2sd: 12.4, median: 16.6, plus2sd: 22.0, plus3sd: 25.2 },
    { bulan: 52, min3sd: 11.3, min2sd: 12.5, median: 16.8, plus2sd: 22.3, plus3sd: 25.5 },
    { bulan: 53, min3sd: 11.4, min2sd: 12.6, median: 17.0, plus2sd: 22.6, plus3sd: 25.8 },
    { bulan: 54, min3sd: 11.5, min2sd: 12.7, median: 17.2, plus2sd: 22.8, plus3sd: 26.1 },
    { bulan: 55, min3sd: 11.6, min2sd: 12.8, median: 17.3, plus2sd: 23.1, plus3sd: 26.4 },
    { bulan: 56, min3sd: 11.7, min2sd: 13.0, median: 17.5, plus2sd: 23.4, plus3sd: 26.7 },
    { bulan: 57, min3sd: 11.8, min2sd: 13.1, median: 17.7, plus2sd: 23.6, plus3sd: 27.0 },
    { bulan: 58, min3sd: 11.9, min2sd: 13.2, median: 17.9, plus2sd: 23.9, plus3sd: 27.3 },
    { bulan: 59, min3sd: 12.0, min2sd: 13.3, median: 18.0, plus2sd: 24.2, plus3sd: 27.6 },
    { bulan: 60, min3sd: 12.1, min2sd: 13.4, median: 18.2, plus2sd: 24.4, plus3sd: 27.9 }
  ]
};

// Data standar WHO untuk BB/TB (Berat Badan menurut Tinggi Badan) - Wasting (Sample data)
const standarBBTB = {
  'laki-laki': [
    { tinggi: 45, min3sd: 1.9, min2sd: 2.1, median: 2.4, plus1sd: 2.7, plus2sd: 3.1, plus3sd: 3.5 },
    { tinggi: 50, min3sd: 2.9, min2sd: 3.2, median: 3.7, plus1sd: 4.3, plus2sd: 4.9, plus3sd: 5.6 },
    { tinggi: 55, min3sd: 4.1, min2sd: 4.5, median: 5.2, plus1sd: 6.0, plus2sd: 6.9, plus3sd: 7.9 },
    { tinggi: 60, min3sd: 5.4, min2sd: 5.9, median: 6.8, plus1sd: 7.8, plus2sd: 9.0, plus3sd: 10.3 },
    { tinggi: 65, min3sd: 6.7, min2sd: 7.4, median: 8.4, plus1sd: 9.6, plus2sd: 11.0, plus3sd: 12.6 },
    { tinggi: 70, min3sd: 8.1, min2sd: 8.9, median: 10.1, plus1sd: 11.5, plus2sd: 13.1, plus3sd: 15.0 },
    { tinggi: 75, min3sd: 9.5, min2sd: 10.4, median: 11.8, plus1sd: 13.4, plus2sd: 15.2, plus3sd: 17.4 },
    { tinggi: 80, min3sd: 10.9, min2sd: 11.9, median: 13.5, plus1sd: 15.3, plus2sd: 17.3, plus3sd: 19.8 },
    { tinggi: 85, min3sd: 12.3, min2sd: 13.5, median: 15.2, plus1sd: 17.2, plus2sd: 19.5, plus3sd: 22.2 },
    { tinggi: 90, min3sd: 13.7, min2sd: 15.0, median: 16.9, plus1sd: 19.1, plus2sd: 21.6, plus3sd: 24.6 },
    { tinggi: 95, min3sd: 15.1, min2sd: 16.5, median: 18.6, plus1sd: 21.0, plus2sd: 23.8, plus3sd: 27.0 },
    { tinggi: 100, min3sd: 16.5, min2sd: 18.0, median: 20.3, plus1sd: 22.9, plus2sd: 25.9, plus3sd: 29.4 },
    { tinggi: 105, min3sd: 17.9, min2sd: 19.5, median: 22.0, plus1sd: 24.8, plus2sd: 28.0, plus3sd: 31.8 },
    { tinggi: 110, min3sd: 19.3, min2sd: 21.0, median: 23.7, plus1sd: 26.7, plus2sd: 30.1, plus3sd: 34.2 },
    { tinggi: 115, min3sd: 20.7, min2sd: 22.5, median: 25.4, plus1sd: 28.6, plus2sd: 32.2, plus3sd: 36.6 },
    { tinggi: 120, min3sd: 22.1, min2sd: 24.0, median: 27.1, plus1sd: 30.5, plus2sd: 34.3, plus3sd: 39.0 }
  ],
  'perempuan': [
    { tinggi: 45, min3sd: 1.8, min2sd: 2.0, median: 2.3, plus1sd: 2.6, plus2sd: 3.0, plus3sd: 3.4 },
    { tinggi: 50, min3sd: 2.7, min2sd: 3.0, median: 3.5, plus1sd: 4.0, plus2sd: 4.6, plus3sd: 5.3 },
    { tinggi: 55, min3sd: 3.8, min2sd: 4.2, median: 4.8, plus1sd: 5.5, plus2sd: 6.3, plus3sd: 7.3 },
    { tinggi: 60, min3sd: 5.0, min2sd: 5.5, median: 6.2, plus1sd: 7.1, plus2sd: 8.2, plus3sd: 9.4 },
    { tinggi: 65, min3sd: 6.2, min2sd: 6.8, median: 7.7, plus1sd: 8.8, plus2sd: 10.1, plus3sd: 11.6 },
    { tinggi: 70, min3sd: 7.4, min2sd: 8.1, median: 9.2, plus1sd: 10.5, plus2sd: 12.0, plus3sd: 13.8 },
    { tinggi: 75, min3sd: 8.6, min2sd: 9.4, median: 10.7, plus1sd: 12.2, plus2sd: 13.9, plus3sd: 16.0 },
    { tinggi: 80, min3sd: 9.8, min2sd: 10.7, median: 12.2, plus1sd: 13.9, plus2sd: 15.8, plus3sd: 18.2 },
    { tinggi: 85, min3sd: 11.0, min2sd: 12.0, median: 13.7, plus1sd: 15.6, plus2sd: 17.7, plus3sd: 20.4 },
    { tinggi: 90, min3sd: 12.2, min2sd: 13.3, median: 15.2, plus1sd: 17.3, plus2sd: 19.6, plus3sd: 22.6 },
    { tinggi: 95, min3sd: 13.4, min2sd: 14.6, median: 16.7, plus1sd: 19.0, plus2sd: 21.5, plus3sd: 24.8 },
    { tinggi: 100, min3sd: 14.6, min2sd: 15.9, median: 18.2, plus1sd: 20.7, plus2sd: 23.4, plus3sd: 27.0 },
    { tinggi: 105, min3sd: 15.8, min2sd: 17.2, median: 19.7, plus1sd: 22.4, plus2sd: 25.3, plus3sd: 29.2 },
    { tinggi: 110, min3sd: 17.0, min2sd: 18.5, median: 21.2, plus1sd: 24.1, plus2sd: 27.2, plus3sd: 31.4 },
    { tinggi: 115, min3sd: 18.2, min2sd: 19.8, median: 22.7, plus1sd: 25.8, plus2sd: 29.1, plus3sd: 33.6 },
    { tinggi: 120, min3sd: 19.4, min2sd: 21.1, median: 24.2, plus1sd: 27.5, plus2sd: 31.0, plus3sd: 35.8 }
  ]
};

interface StatusResult {
  status: string;
  warna: string;
}

const StuntingCalculator: React.FC = () => {
  const [result, setResult] = useState<string>('');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { toast } = useToast();

  // Fungsi untuk menghitung umur dalam bulan
  const hitungUmurBulan = (tglLahir: string, tglUkur: string): { bulan: number; formatText: string } => {
    const lahir = new Date(tglLahir);
    const ukur = new Date(tglUkur);
    
    let tahun = ukur.getFullYear() - lahir.getFullYear();
    let bulan = ukur.getMonth() - lahir.getMonth();
    
    if (ukur.getDate() < lahir.getDate()) {
      bulan--;
    }
    
    if (bulan < 0) {
      tahun--;
      bulan += 12;
    }
    
    const totalBulan = (tahun * 12) + bulan;
    const formatText = tahun > 0 
      ? `${tahun} tahun ${bulan} bulan` 
      : `${bulan} bulan`;
      
    return { bulan: totalBulan, formatText };
  };

  // Fungsi untuk menghitung status stunting
  const hitungStatusStunting = (umurBulan: number, tinggiCm: number, jenisKelamin: string): StatusResult => {
    const dataStandar = standarTBU[jenisKelamin as keyof typeof standarTBU][umurBulan];
    
    if (tinggiCm < dataStandar.min3sd) {
      return { status: 'Sangat Pendek - Perlu perhatian khusus', warna: 'alert-danger' };
    } else if (tinggiCm < dataStandar.min2sd) {
      return { status: 'Agak Pendek - Perlu dipantau', warna: 'alert-warning' };
    } else if (tinggiCm <= dataStandar.plus2sd) {
      return { status: 'Tinggi Badan Normal', warna: 'alert-success' };
    } else {
      return { status: 'Tinggi Badan Lebih - Kondisi Baik', warna: 'alert-primary' };
    }
  };

  // Fungsi untuk menghitung status underweight
  const hitungStatusUnderweight = (umurBulan: number, beratKg: number, jenisKelamin: string): StatusResult => {
    const dataStandar = standarBBU[jenisKelamin as keyof typeof standarBBU][umurBulan];
    
    if (beratKg < dataStandar.min3sd) {
      return { status: 'Berat Badan Sangat Kurang - Butuh intervensi segera', warna: 'alert-danger' };
    } else if (beratKg < dataStandar.min2sd) {
      return { status: 'Berat Badan Kurang - Perlu ditingkatkan', warna: 'alert-warning' };
    } else if (beratKg <= dataStandar.plus2sd) {
      return { status: 'Berat Badan Ideal', warna: 'alert-success' };
    } else {
      return { status: 'Berat Badan Berlebih - Perlu diatur', warna: 'alert-primary' };
    }
  };

  // Fungsi untuk menghitung status wasting
  const hitungStatusWasting = (tinggiCm: number, beratKg: number, jenisKelamin: string): StatusResult => {
    // Cari tinggi yang paling mendekati
    const dataArray = standarBBTB[jenisKelamin as keyof typeof standarBBTB];
    const dataStandar = dataArray.find(d => d.tinggi >= tinggiCm) || dataArray[dataArray.length - 1];
    
    if (beratKg < dataStandar.min3sd) {
      return { status: 'Anak Sangat Kurus - Butuh perhatian medis', warna: 'alert-danger' };
    } else if (beratKg < dataStandar.min2sd) {
      return { status: 'Anak Agak Kurus - Perlu nutrisi lebih', warna: 'alert-warning' };
    } else if (beratKg <= dataStandar.plus1sd) {
      return { status: 'Berat Badan Seimbang', warna: 'alert-success' };
    } else if (beratKg <= dataStandar.plus2sd) {
      return { status: 'Anak Sedikit Gemuk - Mulai diperhatikan', warna: 'alert-primary' };
    } else {
      return { status: 'Anak Gemuk - Perlu olahraga', warna: 'alert-primary' };
    }
  };

  // Fungsi utama untuk analisis status gizi
  const analisisStatusGizi = () => {
    const namaAnak = (document.getElementById('namaAnak') as HTMLInputElement).value;
    const tglLahir = (document.getElementById('tglLahir') as HTMLInputElement).value;
    const tglUkur = (document.getElementById('tglUkur') as HTMLInputElement).value;
    const jenisKelamin = (document.getElementById('jenisKelamin') as HTMLSelectElement).value;
    const beratBadan = parseFloat((document.getElementById('beratBadan') as HTMLInputElement).value);
    const tinggiBadan = parseFloat((document.getElementById('tinggiBadan') as HTMLInputElement).value);

    // Validasi input
    if (!namaAnak || !tglLahir || !tglUkur || !jenisKelamin || !beratBadan || !tinggiBadan) {
      alert('Harap isi semua kolom!');
      return;
    }

    const umurData = hitungUmurBulan(tglLahir, tglUkur);
    
    if (umurData.bulan < 0 || umurData.bulan > 60) {
      alert('Usia anak harus antara 0-60 bulan (0-5 tahun)');
      return;
    }

    // Hitung ketiga status gizi
    const statusStunting = hitungStatusStunting(umurData.bulan, tinggiBadan, jenisKelamin);
    const statusUnderweight = hitungStatusUnderweight(umurData.bulan, beratBadan, jenisKelamin);
    const statusWasting = hitungStatusWasting(tinggiBadan, beratBadan, jenisKelamin);

    // Fungsi untuk mendapatkan rekomendasi berdasarkan status gizi
    const getRecommendations = (stunting, underweight, wasting) => {
      let recommendations = [];
      let notificationType: "default" | "destructive" = 'default';
      let notificationTitle = '✅ Status Gizi Normal';
      let notificationMessage = 'Alhamdulillah, kondisi gizi anak Anda dalam batas normal!';

      // Cek stunting (prioritas tertinggi)
      if (stunting.status.includes('Sangat Pendek')) {
        notificationType = 'destructive';
        notificationTitle = '🚨 Perhatian! Anak Terdeteksi Stunting Berat';
        notificationMessage = 'Segera konsultasi dengan dokter anak atau ahli gizi!';
        recommendations.push(
          '🏥 Segera konsultasi dengan dokter anak atau ahli gizi',
          '🥛 Berikan makanan tinggi protein (telur, ikan, daging, tempe)',
          '🥬 Perbanyak sayuran hijau dan buah-buahan',
          '💊 Minta suplemen vitamin dan mineral dari dokter',
          '📅 Lakukan kontrol rutin setiap bulan'
        );
      } else if (stunting.status.includes('Agak Pendek')) {
        notificationType = 'destructive';
        notificationTitle = '⚠️ Anak Berisiko Stunting';
        notificationMessage = 'Perlu perhatian khusus dan perbaikan gizi segera!';
        recommendations.push(
          '🍳 Tambahkan telur dalam menu harian anak',
          '🐟 Berikan ikan 2-3 kali seminggu',
          '🥤 ASI eksklusif untuk bayi di bawah 6 bulan',
          '🥘 Berikan MPASI bergizi untuk bayi 6+ bulan',
          '👩‍⚕️ Konsultasi dengan petugas kesehatan'
        );
      }

      // Cek underweight
      if (underweight.status.includes('Sangat Kurang')) {
        if (notificationType !== 'destructive') {
          notificationType = 'destructive';
          notificationTitle = '🚨 Berat Badan Sangat Kurang!';
          notificationMessage = 'Anak mengalami kekurangan berat badan yang serius!';
        }
        recommendations.push(
          '🍽️ Tingkatkan frekuensi makan menjadi 5-6 kali sehari',
          '🥜 Berikan makanan tinggi kalori seperti kacang-kacangan',
          '🍌 Tambahkan buah tinggi kalori (pisang, alpukat)',
          '🥛 Berikan susu full cream jika tidak ada alergi'
        );
      } else if (underweight.status.includes('Kurang')) {
        if (notificationType === 'default') {
          notificationType = 'destructive';
          notificationTitle = '⚠️ Berat Badan Kurang';
          notificationMessage = 'Perlu menambah asupan nutrisi untuk anak!';
        }
        recommendations.push(
          '🍚 Berikan porsi makan yang cukup sesuai usia',
          '🥩 Tambahkan protein hewani dalam menu',
          '🌰 Berikan camilan sehat seperti kacang rebus'
        );
      }

      // Cek wasting
      if (wasting.status.includes('Sangat Kurus')) {
        if (notificationType !== 'destructive') {
          notificationType = 'destructive';
          notificationTitle = '🚨 Anak Sangat Kurus!';
          notificationMessage = 'Kondisi darurat gizi! Segera ke dokter!';
        }
        recommendations.push(
          '🏥 Segera bawa ke puskesmas atau rumah sakit',
          '🍼 Berikan makanan lunak tinggi kalori',
          '💧 Pastikan anak cukup minum air',
          '🩺 Periksa kemungkinan penyakit penyerta'
        );
      } else if (wasting.status.includes('Agak Kurus')) {
        if (notificationType === 'default') {
          notificationType = 'destructive';
          notificationTitle = '⚠️ Anak Agak Kurus';
          notificationMessage = 'Perlu meningkatkan asupan gizi seimbang!';
        }
        recommendations.push(
          '🥗 Berikan makanan seimbang 4 sehat 5 sempurna',
          '🏃‍♀️ Ajak anak bermain aktif tapi tidak berlebihan',
          '😴 Pastikan anak tidur cukup 10-12 jam sehari'
        );
      }

      // Jika semua normal
      if (recommendations.length === 0) {
        recommendations.push(
          '✅ Pertahankan pola makan yang sudah baik',
          '🎯 Lanjutkan pemberian makanan bergizi seimbang',
          '🏃‍♀️ Ajak anak bermain dan beraktivitas fisik',
          '📊 Pantau pertumbuhan secara rutin setiap bulan',
          '👨‍👩‍👧‍👦 Ciptakan lingkungan keluarga yang mendukung'
        );
      }

      // Tambahkan rekomendasi umum
      recommendations.push(
        '💊 Berikan vitamin sesuai anjuran dokter',
        '🧼 Jaga kebersihan makanan dan lingkungan',
        '💉 Pastikan imunisasi lengkap sesuai jadwal'
      );

      return { recommendations, notificationType, notificationTitle, notificationMessage };
    };

    const { recommendations, notificationType, notificationTitle, notificationMessage } = getRecommendations(statusStunting, statusUnderweight, statusWasting);

    // Tampilkan notifikasi
    toast({
      title: notificationTitle,
      description: notificationMessage,
      variant: notificationType,
      duration: 8000,
    });

    // Tampilkan hasil dengan rekomendasi
    const hasilText = `
      <div class="mb-4">
        <h5><strong>Hasil Analisis Status Gizi Lengkap</strong></h5>
        <p><strong>Nama Anak:</strong> ${namaAnak}</p>
        <p><strong>Usia saat diukur:</strong> ${umurData.formatText}</p>
        <p><strong>Berat Badan:</strong> ${beratBadan} kg</p>
        <p><strong>Tinggi Badan:</strong> ${tinggiBadan} cm</p>
      </div>
      
      <div class="row">
        <div class="col-12 mb-3">
          <div class="alert ${statusStunting.warna} mb-2">
            <strong>Stunting (Tinggi/Umur):</strong> ${statusStunting.status}
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="alert ${statusUnderweight.warna} mb-2">
            <strong>Underweight (Berat/Umur):</strong> ${statusUnderweight.status}
          </div>
        </div>
        <div class="col-12 mb-3">
          <div class="alert ${statusWasting.warna} mb-2">
            <strong>Wasting (Berat/Tinggi):</strong> ${statusWasting.status}
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h5><strong>🎯 Rekomendasi untuk Ibu</strong></h5>
        <div class="alert alert-info border-0 shadow-sm" style="background: linear-gradient(135deg, #e3f2fd, #bbdefb);">
          <h6 class="fw-bold mb-3 text-primary">📋 Yang harus Ibu lakukan:</h6>
          <ul class="mb-0">
            ${recommendations.map(rec => `<li class="mb-2 fw-medium">${rec}</li>`).join('')}
          </ul>
        </div>
        <div class="mt-3 p-3 bg-warning-subtle rounded-3 border-start border-warning border-4">
          <h6 class="fw-bold text-warning-emphasis mb-2">⚠️ Penting untuk diingat:</h6>
          <p class="mb-0 small text-warning-emphasis">
            Hasil ini adalah panduan awal. Selalu konsultasikan dengan dokter anak atau ahli gizi 
            untuk mendapat penanganan yang tepat sesuai kondisi anak Anda.
          </p>
        </div>
      </div>
    `;

    setResult(hasilText);
    setIsVisible(true);
  };

  return (
    <div className="container-fluid bg-light min-vh-100 py-4">
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-11">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary mb-3">
              🩺 SI-PANDA
            </h1>
            <p className="lead text-muted">
              Sistem Pemantau Gizi Anak Desa
            </p>
          </div>
          
          {/* Main Form Card */}
          <div className="card shadow-lg border-0 mb-4">
            <div className="card-header bg-gradient text-white text-center py-4" style={{background: 'linear-gradient(135deg, #007bff, #0056b3)'}}>
              <h3 className="card-title mb-0 fw-bold">
                📝 Data Anak
              </h3>
            </div>
            <div className="card-body p-4">
              <form className="needs-validation" noValidate>
                {/* Nama Anak */}
                <div className="mb-4">
                  <label htmlFor="namaAnak" className="form-label fw-semibold">
                    👶 Nama Anak
                  </label>
                  <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    id="namaAnak" 
                    placeholder="Contoh: Budi"
                    required 
                  />
                </div>

                {/* Tanggal */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="tglLahir" className="form-label fw-semibold">
                      🎂 Tanggal Lahir
                    </label>
                    <input 
                      type="date" 
                      className="form-control form-control-lg" 
                      id="tglLahir" 
                      required 
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tglUkur" className="form-label fw-semibold">
                      📅 Tanggal Pengukuran
                    </label>
                    <input 
                      type="date" 
                      className="form-control form-control-lg" 
                      id="tglUkur" 
                      required 
                    />
                  </div>
                </div>

                {/* Jenis Kelamin */}
                <div className="mb-4">
                  <label htmlFor="jenisKelamin" className="form-label fw-semibold">
                    👦👧 Jenis Kelamin
                  </label>
                  <select className="form-select form-select-lg" id="jenisKelamin" required>
                    <option value="">-- Pilih Jenis Kelamin --</option>
                    <option value="laki-laki">👦 Laki-laki</option>
                    <option value="perempuan">👧 Perempuan</option>
                  </select>
                </div>

                {/* Pengukuran */}
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="beratBadan" className="form-label fw-semibold">
                      ⚖️ Berat Badan
                    </label>
                    <div className="input-group input-group-lg">
                      <input 
                        type="number" 
                        className="form-control" 
                        id="beratBadan" 
                        placeholder="12.5"
                        step="0.1"
                        min="1"
                        max="50"
                        required 
                      />
                      <span className="input-group-text bg-light">kg</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="tinggiBadan" className="form-label fw-semibold">
                      📏 Tinggi/Panjang Badan
                    </label>
                    <div className="input-group input-group-lg">
                      <input 
                        type="number" 
                        className="form-control" 
                        id="tinggiBadan" 
                        placeholder="75.5"
                        step="0.1"
                        min="30"
                        max="150"
                        required 
                      />
                      <span className="input-group-text bg-light">cm</span>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="d-grid">
                  <button 
                    type="button" 
                    className="btn btn-primary btn-lg py-3 fw-bold"
                    id="tombolHitung"
                    onClick={analisisStatusGizi}
                    style={{
                      background: 'linear-gradient(135deg, #28a745, #20c997)',
                      border: 'none',
                      borderRadius: '12px'
                    }}
                  >
                    🔍 Analisis Status Gizi Sekarang
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Hasil Analisis */}
          {isVisible && (
            <div className="card shadow-lg border-0 mb-4" id="hasilAnalisis">
              <div className="card-header bg-success text-white text-center py-3">
                <h4 className="card-title mb-0 fw-bold">
                  📊 Hasil Analisis Status Gizi
                </h4>
              </div>
              <div className="card-body p-4">
                <div dangerouslySetInnerHTML={{ __html: result }} />
              </div>
            </div>
          )}

          {/* Panduan Interpretasi */}
          <div className="card shadow border-0">
            <div className="card-header bg-info text-white text-center py-3">
              <h4 className="card-title mb-0 fw-bold">
                📚 Panduan untuk Ibu
              </h4>
            </div>
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-lg-4">
                  <div className="h-100 p-3 bg-light rounded-3">
                    <h5 className="fw-bold text-primary mb-3">
                      📏 Tinggi Badan Anak
                    </h5>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-danger me-2 px-2 py-1">Sangat Pendek</span>
                        <small>Perlu konsultasi dokter segera</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-warning me-2 px-2 py-1">Agak Pendek</span>
                        <small>Perlu dipantau dan ditingkatkan</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2 px-2 py-1">Normal</span>
                        <small>Tinggi badan sesuai usia</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2 px-2 py-1">Baik</span>
                        <small>Tinggi badan lebih dari rata-rata</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <div className="h-100 p-3 bg-light rounded-3">
                    <h5 className="fw-bold text-primary mb-3">
                      ⚖️ Berat Badan Anak
                    </h5>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-danger me-2 px-2 py-1">Sangat Kurang</span>
                        <small>Segera ke dokter</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-warning me-2 px-2 py-1">Kurang</span>
                        <small>Perlu ditingkatkan</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2 px-2 py-1">Ideal</span>
                        <small>Berat badan sesuai usia</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2 px-2 py-1">Berlebih</span>
                        <small>Perlu diatur pola makan</small>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="col-lg-4">
                  <div className="h-100 p-3 bg-light rounded-3">
                    <h5 className="fw-bold text-primary mb-3">
                      🍎 Proporsi Tubuh Anak
                    </h5>
                    <div className="d-flex flex-column gap-2">
                      <div className="d-flex align-items-center">
                        <span className="badge bg-danger me-2 px-2 py-1">Sangat Kurus</span>
                        <small>Perlu perhatian medis</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-warning me-2 px-2 py-1">Agak Kurus</span>
                        <small>Tambah nutrisi</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-success me-2 px-2 py-1">Seimbang</span>
                        <small>Berat dan tinggi seimbang</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="badge bg-primary me-2 px-2 py-1">Gemuk</span>
                        <small>Perbanyak aktivitas fisik</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tips untuk Ibu */}
              <div className="mt-4 p-3 bg-primary-subtle rounded-3 border-start border-primary border-4">
                <h6 className="fw-bold text-primary mb-2">💡 Tips untuk Ibu:</h6>
                <ul className="mb-0 small">
                  <li>Ukur anak secara rutin setiap bulan</li>
                  <li>Berikan makanan bergizi seimbang</li>
                  <li>Pastikan anak cukup tidur dan bermain</li>
                  <li>Konsultasi dengan dokter anak jika ada kekhawatiran</li>
                </ul>
              </div>
              
              <div className="mt-3 text-center">
                <small className="text-muted">
                  <strong>📝 Catatan:</strong> Hasil ini berdasarkan standar WHO/Kemenkes RI. 
                  Selalu konsultasikan dengan tenaga kesehatan untuk interpretasi yang lebih lengkap.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuntingCalculator;