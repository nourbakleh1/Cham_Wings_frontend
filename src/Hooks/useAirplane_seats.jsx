import React, { useState } from 'react'

const useAirplane_seats = () => {
    const [seats_plan,setSeats_plan]=useState(
        [
            {
                id: 1,
                class_id: 2,
                seat_number: "1a",
                
                checked:0,
                selected:0
            },
            {
                id: 2,
                class_id: 2,
                seat_number: "1b",
                
                checked:0,
                selected:0
            },
            {
                id: 3,
                class_id: 2,
                seat_number: "1c",
                
                checked:0,
                selected:0
            },
            {
                id: 4,
                class_id: 2,
                seat_number: "1d",
                
                checked:0,
                selected:0
            },
            {
                id: 5,
                class_id: 2,
                seat_number: "1e",
                
                checked:0,
                selected:0
            },
            {
                id: 6,
                class_id: 2,
                seat_number: "1f",
                
                checked:0,
                selected:0
            },
            {
                id: 7,
                class_id: 2,
                seat_number: "2a",
                
                checked:0,
                selected:0
            },
            {
                id: 8,
                class_id: 2,
                seat_number: "2b",
                
                checked:0,
                selected:0
            },
            {
                id: 9,
                class_id: 2,
                seat_number: "2c",
                
                checked:0,
                selected:0
            },
            {
                id: 10,
                class_id: 2,
                seat_number: "2d",
                
                checked:0,
                selected:0
            },
            {
                id: 11,
                class_id: 2,
                seat_number: "2e",
                
                checked:0,
                selected:0
            },
            {
                id: 12,
                class_id: 2,
                seat_number: "2f",
                
                checked:0,
                selected:0
            },
            {
                id: 13,
                class_id: 2,
                seat_number: "3a",
                
                checked:0,
                selected:0
            },
            {
                id: 14,
                class_id: 2,
                seat_number: "3b",
                
                checked:0,
                selected:0
            },
            {
                id: 15,
                class_id: 2,
                seat_number: "3c",
                
                checked:0,
                selected:0
            },
            {
                id: 16,
                class_id: 2,
                seat_number: "3d",
                
                checked:0,
                selected:0
            },
            {
                id: 17,
                class_id: 2,
                seat_number: "3e",
                
                checked:0,
                selected:0
            },
            {
                id: 18,
                class_id: 2,
                seat_number: "3f",
                
                checked:0,
                selected:0
            },
            {
                id: 19,
                class_id: 1,
                seat_number: "4a",
                
                checked:0,
                selected:0
            },
            {
                id: 20,
                class_id: 1,
                seat_number: "4b",
                
                checked:0,
                selected:0
            },
            {
                id: 21,
                class_id: 1,
                seat_number: "4c",
                
                checked:0,
                selected:0
            },
            {
                id: 22,
                class_id: 1,
                seat_number: "4d",
                
                checked:0,
                selected:0
            },
            {
                id: 23,
                class_id: 1,
                seat_number: "4e",
                
                checked:0,
                selected:0
            },
            {
                id: 24,
                class_id: 1,
                seat_number: "4f",
                
                checked:0,
                selected:0
            },
            {
                id: 25,
                class_id: 1,
                seat_number: "5a",
                
                checked:0,
                selected:0
            },
            {
                id: 26,
                class_id: 1,
                seat_number: "5b",
                
                checked:0,
                selected:0
            },
            {
                id: 27,
                class_id: 1,
                seat_number: "5c",
                
                checked:0,
                selected:0
            },
            {
                id: 28,
                class_id: 1,
                seat_number: "5d",
                
                checked:0,
                selected:0
            },
            {
                id: 29,
                class_id: 1,
                seat_number: "5e",
                
                checked:0,
                selected:0
            },
            {
                id: 30,
                class_id: 1,
                seat_number: "5f",
                
                checked:0,
                selected:0
            },
            {
                id: 31,
                class_id: 1,
                seat_number: "6a",
                
                checked:0,
                selected:0
            },
            {
                id: 32,
                class_id: 1,
                seat_number: "6b",
                
                checked:0,
                selected:0
            },
            {
                id: 33,
                class_id: 1,
                seat_number: "6c",
                
                checked:0,
                selected:0
            },
            {
                id: 34,
                class_id: 1,
                seat_number: "6d",
                
                checked:0,
                selected:0
            },
            {
                id: 35,
                class_id: 1,
                seat_number: "6e",
                
                checked:0,
                selected:0
            },
            {
                id: 36,
                class_id: 1,
                seat_number: "6f",
                
                checked:0,
                selected:0
            },
            {
                id: 37,
                class_id: 1,
                seat_number: "7a",
                
                checked:0,
                selected:0
            },
            {
                id: 38,
                class_id: 1,
                seat_number: "7b",
                
                checked:0,
                selected:0
            },
            {
                id: 39,
                class_id: 1,
                seat_number: "7c",
                
                checked:0,
                selected:0
            },
            {
                id: 40,
                class_id: 1,
                seat_number: "7d",
                
                checked:0,
                selected:0
            },
            {
                id: 41,
                class_id: 1,
                seat_number: "7e",
                
                checked:0,
                selected:0
            },
            {
                id: 42,
                class_id: 1,
                seat_number: "7f",
                
                checked:0,
                selected:0
            },
            {
                id: 43,
                class_id: 1,
                seat_number: "8a",
                
                checked:0,
                selected:0
            },
            {
                id: 44,
                class_id: 1,
                seat_number: "8b",
                
                checked:0,
                selected:0
            },
            {
                id: 45,
                class_id: 1,
                seat_number: "8c",
                
                checked:0,
                selected:0
            },
            {
                id: 46,
                class_id: 1,
                seat_number: "8d",
                
                checked:0,
                selected:0
            },
            {
                id: 47,
                class_id: 1,
                seat_number: "8e",
                
                checked:0,
                selected:0
            },
            {
                id: 48,
                class_id: 1,
                seat_number: "8f",
                
                checked:0,
                selected:0
            },
            {
                id: 49,
                class_id: 1,
                seat_number: "9a",
                
                checked:0,
                selected:0
            },
            {
                id: 50,
                class_id: 1,
                seat_number: "9b",
                
                checked:0,
                selected:0
            },
            {
                id: 51,
                class_id: 1,
                seat_number: "9c",
                
                checked:0,
                selected:0
            },
            {
                id: 52,
                class_id: 1,
                seat_number: "9d",
                
                checked:0,
                selected:0
            },
            {
                id: 53,
                class_id: 1,
                seat_number: "9e",
                
                checked:0,
                selected:0
            },
            {
                id: 54,
                class_id: 1,
                seat_number: "9f",
                
                checked:0,
                selected:0
            },
            {
                id: 55,
                class_id: 1,
                seat_number: "10a",
                
                checked:0,
                selected:0
            },
            {
                id: 56,
                class_id: 1,
                seat_number: "10b",
                
                checked:0,
                selected:0
            },
            {
                id: 57,
                class_id: 1,
                seat_number: "10c",
                
                checked:0,
                selected:0
            },
            {
                id: 58,
                class_id: 1,
                seat_number: "10d",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 59,
                class_id: 1,
                seat_number: "10e",
                
                checked:0,
                selected:0
            },
            {
                id: 60,
                class_id: 1,
                seat_number: "10f",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 61,
                class_id: 1,
                seat_number: "11a",
                
                checked:0,
                selected:0
            },
            {
                id: 62,
                class_id: 1,
                seat_number: "11b",
                
                checked:0,
                selected:0
            },
            {
                id: 63,
                class_id: 1,
                seat_number: "11c",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 64,
                class_id: 1,
                seat_number: "11d",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 65,
                class_id: 1,
                seat_number: "11e",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 66,
                class_id: 1,
                seat_number: "11f",
                
                checked:0,
                selected:0
                
            },
            {
                id: 67,
                class_id: 1,
                seat_number: "12a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 68,
                class_id: 1,
                seat_number: "12b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 69,
                class_id: 1,
                seat_number: "12c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 70,
                class_id: 1,
                seat_number: "12d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 71,
                class_id: 1,
                seat_number: "12e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 72,
                class_id: 1,
                seat_number: "12f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 73,
                class_id: 1,
                seat_number: "13a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 74,
                class_id: 1,
                seat_number: "13b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 75,
                class_id: 1,
                seat_number: "13c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 76,
                class_id: 1,
                seat_number: "13d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 77,
                class_id: 1,
                seat_number: "13e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 78,
                class_id: 1,
                seat_number: "13f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 79,
                class_id: 1,
                seat_number: "14a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 80,
                class_id: 1,
                seat_number: "14b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 81,
                class_id: 1,
                seat_number: "14c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 82,
                class_id: 1,
                seat_number: "14d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 83,
                class_id: 1,
                seat_number: "14e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 84,
                class_id: 1,
                seat_number: "14f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 85,
                class_id: 1,
                seat_number: "15a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 86,
                class_id: 1,
                seat_number: "15b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 87,
                class_id: 1,
                seat_number: "15c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 88,
                class_id: 1,
                seat_number: "15d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 89,
                class_id: 1,
                seat_number: "15e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 90,
                class_id: 1,
                seat_number: "15f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 91,
                class_id: 1,
                seat_number: "16a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 92,
                class_id: 1,
                seat_number: "16b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 93,
                class_id: 1,
                seat_number: "16c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 94,
                class_id: 1,
                seat_number: "16d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 95,
                class_id: 1,
                seat_number: "16e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 96,
                class_id: 1,
                seat_number: "16f",
                selected:0,
                
                checked:0,
                selected:0,
        
            },
            {
                id: 97,
                class_id: 1,
                seat_number: "17a",
                selected:0,
                
                checked:0
            },
            {
                id: 98,
                class_id: 1,
                seat_number: "17b",
                selected:0,
                
                checked:0
            },
            {
                id: 99,
                class_id: 1,
                seat_number: "17c",
                selected:0,
                
                checked:0
            },
            {
                id: 100,
                class_id: 1,
                seat_number: "17d",
                selected:0,
                
                checked:0
            },
            {
                id: 101,
                class_id: 1,
                seat_number: "17e",
                selected:0,
                
                checked:0
            },
            {
                id: 102,
                class_id: 1,
                seat_number: "17f",
                selected:0,
                
                checked:0
            },
            {
                id: 103,
                class_id: 1,
                seat_number: "18a",
                selected:0,
                
                checked:0
            },
            {
                id: 104,
                class_id: 1,
                seat_number: "18b",
                selected:0,
                
                checked:0
            },
            {
                id: 105,
                class_id: 1,
                seat_number: "18c",
                selected:0,
                
                checked:0
            },
            {
                id: 106,
                class_id: 1,
                seat_number: "18d",
                selected:0,
                
                checked:0
            },
            {
                id: 107,
                class_id: 1,
                seat_number: "18e",
                selected:0,
                
                checked:0
            },
            {
                id: 108,
                class_id: 1,
                seat_number: "18f",
                selected:0,
                checked:0
            },
            {
                id: 109,
                class_id: 1,
                seat_number: "19a",
                selected:0,
                checked:0
            },
            {
                id: 110,
                class_id: 1,
                seat_number: "19b",
                selected:0,
                checked:0
            },
            {
                id: 111,
                class_id: 1,
                seat_number: "19c",
                selected:0,
                checked:0
            },
            {
                id: 112,
                class_id: 1,
                seat_number: "19d",
                selected:0,
                checked:0
            },
            {
                id: 113,
                class_id: 1,
                seat_number: "19e",
                selected:0,
                checked:0
            },
            {
                id: 114,
                class_id: 1,
                seat_number: "19f",
                selected:0,
                checked:0
            },
            {
                id: 115,
                class_id: 1,
                seat_number: "20a",
                selected:0,
                checked:0
            },
            {
                id: 116,
                class_id: 1,
                seat_number: "20b",
                selected:0,
                checked:0
            },
            {
                id: 117,
                class_id: 1,
                seat_number: "20c",
                selected:0,
                checked:0
            },
            {
                id: 118,
                class_id: 1,
                seat_number: "20d",
                selected:0,
                checked:0
            },
            {
                id: 119,
                class_id: 1,
                seat_number: "20e",
                selected:0,
                checked:0
            },
            {
                id: 120,
                class_id: 1,
                seat_number: "20f",
                selected:0,
                checked:0
            },
            {
                id: 121,
                class_id: 1,
                seat_number: "21a",
                selected:0,
                checked:0
            },
            {
                id: 122,
                class_id: 1,
                seat_number: "21b",
                selected:0,
                checked:0
            },
            {
                id: 123,
                class_id: 1,
                seat_number: "21c",
                selected:0,
                checked:0
            },
            {
                id: 124,
                class_id: 1,
                seat_number: "21d",
                selected:0,
                
                checked:0
            },
            {
                id: 125,
                class_id: 1,
                seat_number: "21e",
                selected:0,
                
                checked:0
            },
            {
                id: 126,
                class_id: 1,
                seat_number: "21f",
                selected:0,
                
                checked:0
            },
            {
                id: 127,
                class_id: 1,
                seat_number: "22a",
                selected:0,
                
                checked:0
            },
            {
                id: 128,
                class_id: 1,
                seat_number: "22b",
                selected:0,
                
                checked:0
            },
            {
                id: 129,
                class_id: 1,
                seat_number: "22c",
                selected:0,
                
                checked:0
            },
            {
                id: 130,
                class_id: 1,
                seat_number: "22d",
                selected:0,
                
                checked:0
            },
            {
                id: 131,
                class_id: 1,
                seat_number: "22e",
                selected:0,
                
                checked:0
            },
            {
                id: 132,
                class_id: 1,
                seat_number: "22f",
                selected:0,
                
                checked:0
            },
            {
                id: 133,
                class_id: 1,
                seat_number: "23a",
                selected:0,
                
                checked:0
            },
            {
                id: 134,
                class_id: 1,
                seat_number: "23b",
                selected:0,
                
                checked:0
            },
            {
                id: 135,
                class_id: 1,
                seat_number: "23c",
                selected:0,
                
                checked:0
            },
            {
                id: 136,
                class_id: 1,
                seat_number: "23d",
                selected:0,
                
                checked:0
            },
            {
                id: 137,
                class_id: 1,
                seat_number: "23e",
                selected:0,
                
                checked:0
            },
            {
                id: 138,
                class_id: 1,
                seat_number: "23f",
                selected:0,
                checked:0
            },
            {
                id: 139,
                class_id: 1,
                seat_number: "24a",
                selected:0,
                checked:0
            },
            {
                id: 140,
                class_id: 1,
                seat_number: "24b",
                selected:0,
                checked:0
            },
            {
                id: 141,
                class_id: 1,
                seat_number: "24c",
                selected:0,
                checked:0
            },
            {
                id: 142,
                class_id: 1,
                seat_number: "24d",
                selected:0,
                
                checked:0
            },
            {
                id: 143,
                class_id: 1,
                seat_number: "24e",
                selected:0,
                checked:0
            },
            {
                id: 144,
                class_id: 1,
                seat_number: "24f",
                selected:0,
                checked:0
            },
            {
                id: 145,
                class_id: 1,
                seat_number: "25a",
                selected:0,
                
                checked:0
            },
            {
                id: 146,
                class_id: 1,
                seat_number: "25b",
                selected:0,
                checked:0
            },
            {
                id: 147,
                class_id: 1,
                seat_number: "25c",
                selected:0,
                checked:0
            },
            {
                id: 148,
                class_id: 1,
                seat_number: "25d",
                selected:0,
                
                checked:0
            },
            {
                id: 149,
                class_id: 1,
                seat_number: "25e",
                selected:0,
                checked:0
            },
            {
                id: 150,
                class_id: 1,
                seat_number: "25f",
                selected:0,
                checked:0
            },
            {
                id: 151,
                class_id: 1,
                seat_number: "26a",
                selected:0,
                
                checked:0
            },
            {
                id: 152,
                class_id: 1,
                seat_number: "26b",
                selected:0,
                checked:0
            },
            {
                id: 153,
                class_id: 1,
                seat_number: "26c",
                selected:0,
                checked:0
            },
            {
                id: 154,
                class_id: 1,
                seat_number: "26d",
                selected:0,
                
                checked:0
            },
            {
                id: 155,
                class_id: 1,
                seat_number: "26e",
                selected:0,
                checked:0
            },
            {
                id: 156,
                class_id: 1,
                seat_number: "26f",
                selected:0,
                
                checked:0
            },
            {
                id: 157,
                class_id: 1,
                seat_number: "27a",
                selected:0,
                
                checked:0
            },
            {
                id: 158,
                class_id: 1,
                seat_number: "27b",
                selected:0,
                
                checked:0
            },
            {
                id: 159,
                class_id: 1,
                seat_number: "27c",
                
                checked:0
            },
            {
                id: 160,
                class_id: 1,
                seat_number: "27d",
                selected:0,
                
                checked:0
            },
            {
                id: 161,
                class_id: 1,
                seat_number: "27e",
                selected:0,
                
                checked:0
            },
            {
                id: 162,
                class_id: 1,
                seat_number: "27f",
                selected:0,
                
                checked:0
            },
            {
                id: 163,
                class_id: 1,
                seat_number: "28a",
                selected:0,
                
                checked:0
            },
            {
                id: 164,
                class_id: 1,
                seat_number: "28b",
                selected:0,
                checked:0
            },
            {
                id: 165,
                class_id: 1,
                seat_number: "28c",
                selected:0,
                checked:0
            },
            {
                id: 166,
                class_id: 1,
                seat_number: "28d",
                selected:0,
                checked:0
            },
            {
                id: 167,
                class_id: 1,
                seat_number: "28e",
                selected:0,
                checked:0
            },
            {
                id: 168,
                class_id: 1,
                seat_number: "28f",
                selected:0,
                checked:0
            }
        ]
        
    );
    const [seats_plan2,setSeats_plan2]=useState(
        [
            {
                id: 1,
                class_id: 2,
                seat_number: "1a",
                
                checked:0,
                selected:0
            },
            {
                id: 2,
                class_id: 2,
                seat_number: "1b",
                
                checked:0,
                selected:0
            },
            {
                id: 3,
                class_id: 2,
                seat_number: "1c",
                
                checked:0,
                selected:0
            },
            {
                id: 4,
                class_id: 2,
                seat_number: "1d",
                
                checked:0,
                selected:0
            },
            {
                id: 5,
                class_id: 2,
                seat_number: "1e",
                
                checked:0,
                selected:0
            },
            {
                id: 6,
                class_id: 2,
                seat_number: "1f",
                
                checked:0,
                selected:0
            },
            {
                id: 7,
                class_id: 2,
                seat_number: "2a",
                
                checked:0,
                selected:0
            },
            {
                id: 8,
                class_id: 2,
                seat_number: "2b",
                
                checked:0,
                selected:0
            },
            {
                id: 9,
                class_id: 2,
                seat_number: "2c",
                
                checked:0,
                selected:0
            },
            {
                id: 10,
                class_id: 2,
                seat_number: "2d",
                
                checked:0,
                selected:0
            },
            {
                id: 11,
                class_id: 2,
                seat_number: "2e",
                
                checked:0,
                selected:0
            },
            {
                id: 12,
                class_id: 2,
                seat_number: "2f",
                
                checked:0,
                selected:0
            },
            {
                id: 13,
                class_id: 2,
                seat_number: "3a",
                
                checked:0,
                selected:0
            },
            {
                id: 14,
                class_id: 2,
                seat_number: "3b",
                
                checked:0,
                selected:0
            },
            {
                id: 15,
                class_id: 2,
                seat_number: "3c",
                
                checked:0,
                selected:0
            },
            {
                id: 16,
                class_id: 2,
                seat_number: "3d",
                
                checked:0,
                selected:0
            },
            {
                id: 17,
                class_id: 2,
                seat_number: "3e",
                
                checked:0,
                selected:0
            },
            {
                id: 18,
                class_id: 2,
                seat_number: "3f",
                
                checked:0,
                selected:0
            },
            {
                id: 19,
                class_id: 1,
                seat_number: "4a",
                
                checked:0,
                selected:0
            },
            {
                id: 20,
                class_id: 1,
                seat_number: "4b",
                
                checked:0,
                selected:0
            },
            {
                id: 21,
                class_id: 1,
                seat_number: "4c",
                
                checked:0,
                selected:0
            },
            {
                id: 22,
                class_id: 1,
                seat_number: "4d",
                
                checked:0,
                selected:0
            },
            {
                id: 23,
                class_id: 1,
                seat_number: "4e",
                
                checked:0,
                selected:0
            },
            {
                id: 24,
                class_id: 1,
                seat_number: "4f",
                
                checked:0,
                selected:0
            },
            {
                id: 25,
                class_id: 1,
                seat_number: "5a",
                
                checked:0,
                selected:0
            },
            {
                id: 26,
                class_id: 1,
                seat_number: "5b",
                
                checked:0,
                selected:0
            },
            {
                id: 27,
                class_id: 1,
                seat_number: "5c",
                
                checked:0,
                selected:0
            },
            {
                id: 28,
                class_id: 1,
                seat_number: "5d",
                
                checked:0,
                selected:0
            },
            {
                id: 29,
                class_id: 1,
                seat_number: "5e",
                
                checked:0,
                selected:0
            },
            {
                id: 30,
                class_id: 1,
                seat_number: "5f",
                
                checked:0,
                selected:0
            },
            {
                id: 31,
                class_id: 1,
                seat_number: "6a",
                
                checked:0,
                selected:0
            },
            {
                id: 32,
                class_id: 1,
                seat_number: "6b",
                
                checked:0,
                selected:0
            },
            {
                id: 33,
                class_id: 1,
                seat_number: "6c",
                
                checked:0,
                selected:0
            },
            {
                id: 34,
                class_id: 1,
                seat_number: "6d",
                
                checked:0,
                selected:0
            },
            {
                id: 35,
                class_id: 1,
                seat_number: "6e",
                
                checked:0,
                selected:0
            },
            {
                id: 36,
                class_id: 1,
                seat_number: "6f",
                
                checked:0,
                selected:0
            },
            {
                id: 37,
                class_id: 1,
                seat_number: "7a",
                
                checked:0,
                selected:0
            },
            {
                id: 38,
                class_id: 1,
                seat_number: "7b",
                
                checked:0,
                selected:0
            },
            {
                id: 39,
                class_id: 1,
                seat_number: "7c",
                
                checked:0,
                selected:0
            },
            {
                id: 40,
                class_id: 1,
                seat_number: "7d",
                
                checked:0,
                selected:0
            },
            {
                id: 41,
                class_id: 1,
                seat_number: "7e",
                
                checked:0,
                selected:0
            },
            {
                id: 42,
                class_id: 1,
                seat_number: "7f",
                
                checked:0,
                selected:0
            },
            {
                id: 43,
                class_id: 1,
                seat_number: "8a",
                
                checked:0,
                selected:0
            },
            {
                id: 44,
                class_id: 1,
                seat_number: "8b",
                
                checked:0,
                selected:0
            },
            {
                id: 45,
                class_id: 1,
                seat_number: "8c",
                
                checked:0,
                selected:0
            },
            {
                id: 46,
                class_id: 1,
                seat_number: "8d",
                
                checked:0,
                selected:0
            },
            {
                id: 47,
                class_id: 1,
                seat_number: "8e",
                
                checked:0,
                selected:0
            },
            {
                id: 48,
                class_id: 1,
                seat_number: "8f",
                
                checked:0,
                selected:0
            },
            {
                id: 49,
                class_id: 1,
                seat_number: "9a",
                
                checked:0,
                selected:0
            },
            {
                id: 50,
                class_id: 1,
                seat_number: "9b",
                
                checked:0,
                selected:0
            },
            {
                id: 51,
                class_id: 1,
                seat_number: "9c",
                
                checked:0,
                selected:0
            },
            {
                id: 52,
                class_id: 1,
                seat_number: "9d",
                
                checked:0,
                selected:0
            },
            {
                id: 53,
                class_id: 1,
                seat_number: "9e",
                
                checked:0,
                selected:0
            },
            {
                id: 54,
                class_id: 1,
                seat_number: "9f",
                
                checked:0,
                selected:0
            },
            {
                id: 55,
                class_id: 1,
                seat_number: "10a",
                
                checked:0,
                selected:0
            },
            {
                id: 56,
                class_id: 1,
                seat_number: "10b",
                
                checked:0,
                selected:0
            },
            {
                id: 57,
                class_id: 1,
                seat_number: "10c",
                
                checked:0,
                selected:0
            },
            {
                id: 58,
                class_id: 1,
                seat_number: "10d",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 59,
                class_id: 1,
                seat_number: "10e",
                
                checked:0,
                selected:0
            },
            {
                id: 60,
                class_id: 1,
                seat_number: "10f",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 61,
                class_id: 1,
                seat_number: "11a",
                
                checked:0,
                selected:0
            },
            {
                id: 62,
                class_id: 1,
                seat_number: "11b",
                
                checked:0,
                selected:0
            },
            {
                id: 63,
                class_id: 1,
                seat_number: "11c",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 64,
                class_id: 1,
                seat_number: "11d",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 65,
                class_id: 1,
                seat_number: "11e",
                status: "Available",
                checked:0,
                selected:0
            },
            {
                id: 66,
                class_id: 1,
                seat_number: "11f",
                
                checked:0,
                selected:0
                
            },
            {
                id: 67,
                class_id: 1,
                seat_number: "12a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 68,
                class_id: 1,
                seat_number: "12b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 69,
                class_id: 1,
                seat_number: "12c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 70,
                class_id: 1,
                seat_number: "12d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 71,
                class_id: 1,
                seat_number: "12e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 72,
                class_id: 1,
                seat_number: "12f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 73,
                class_id: 1,
                seat_number: "13a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 74,
                class_id: 1,
                seat_number: "13b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 75,
                class_id: 1,
                seat_number: "13c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 76,
                class_id: 1,
                seat_number: "13d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 77,
                class_id: 1,
                seat_number: "13e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 78,
                class_id: 1,
                seat_number: "13f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 79,
                class_id: 1,
                seat_number: "14a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 80,
                class_id: 1,
                seat_number: "14b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 81,
                class_id: 1,
                seat_number: "14c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 82,
                class_id: 1,
                seat_number: "14d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 83,
                class_id: 1,
                seat_number: "14e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 84,
                class_id: 1,
                seat_number: "14f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 85,
                class_id: 1,
                seat_number: "15a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 86,
                class_id: 1,
                seat_number: "15b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 87,
                class_id: 1,
                seat_number: "15c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 88,
                class_id: 1,
                seat_number: "15d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 89,
                class_id: 1,
                seat_number: "15e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 90,
                class_id: 1,
                seat_number: "15f",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 91,
                class_id: 1,
                seat_number: "16a",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 92,
                class_id: 1,
                seat_number: "16b",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 93,
                class_id: 1,
                seat_number: "16c",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 94,
                class_id: 1,
                seat_number: "16d",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 95,
                class_id: 1,
                seat_number: "16e",
                
                checked:0,
                selected:0,
        
            },
            {
                id: 96,
                class_id: 1,
                seat_number: "16f",
                selected:0,
                
                checked:0,
                selected:0,
        
            },
            {
                id: 97,
                class_id: 1,
                seat_number: "17a",
                selected:0,
                
                checked:0
            },
            {
                id: 98,
                class_id: 1,
                seat_number: "17b",
                selected:0,
                
                checked:0
            },
            {
                id: 99,
                class_id: 1,
                seat_number: "17c",
                selected:0,
                
                checked:0
            },
            {
                id: 100,
                class_id: 1,
                seat_number: "17d",
                selected:0,
                
                checked:0
            },
            {
                id: 101,
                class_id: 1,
                seat_number: "17e",
                selected:0,
                
                checked:0
            },
            {
                id: 102,
                class_id: 1,
                seat_number: "17f",
                selected:0,
                
                checked:0
            },
            {
                id: 103,
                class_id: 1,
                seat_number: "18a",
                selected:0,
                
                checked:0
            },
            {
                id: 104,
                class_id: 1,
                seat_number: "18b",
                selected:0,
                
                checked:0
            },
            {
                id: 105,
                class_id: 1,
                seat_number: "18c",
                selected:0,
                
                checked:0
            },
            {
                id: 106,
                class_id: 1,
                seat_number: "18d",
                selected:0,
                
                checked:0
            },
            {
                id: 107,
                class_id: 1,
                seat_number: "18e",
                selected:0,
                
                checked:0
            },
            {
                id: 108,
                class_id: 1,
                seat_number: "18f",
                selected:0,
                checked:0
            },
            {
                id: 109,
                class_id: 1,
                seat_number: "19a",
                selected:0,
                checked:0
            },
            {
                id: 110,
                class_id: 1,
                seat_number: "19b",
                selected:0,
                checked:0
            },
            {
                id: 111,
                class_id: 1,
                seat_number: "19c",
                selected:0,
                checked:0
            },
            {
                id: 112,
                class_id: 1,
                seat_number: "19d",
                selected:0,
                checked:0
            },
            {
                id: 113,
                class_id: 1,
                seat_number: "19e",
                selected:0,
                checked:0
            },
            {
                id: 114,
                class_id: 1,
                seat_number: "19f",
                selected:0,
                checked:0
            },
            {
                id: 115,
                class_id: 1,
                seat_number: "20a",
                selected:0,
                checked:0
            },
            {
                id: 116,
                class_id: 1,
                seat_number: "20b",
                selected:0,
                checked:0
            },
            {
                id: 117,
                class_id: 1,
                seat_number: "20c",
                selected:0,
                checked:0
            },
            {
                id: 118,
                class_id: 1,
                seat_number: "20d",
                selected:0,
                checked:0
            },
            {
                id: 119,
                class_id: 1,
                seat_number: "20e",
                selected:0,
                checked:0
            },
            {
                id: 120,
                class_id: 1,
                seat_number: "20f",
                selected:0,
                checked:0
            },
            {
                id: 121,
                class_id: 1,
                seat_number: "21a",
                selected:0,
                checked:0
            },
            {
                id: 122,
                class_id: 1,
                seat_number: "21b",
                selected:0,
                checked:0
            },
            {
                id: 123,
                class_id: 1,
                seat_number: "21c",
                selected:0,
                checked:0
            },
            {
                id: 124,
                class_id: 1,
                seat_number: "21d",
                selected:0,
                
                checked:0
            },
            {
                id: 125,
                class_id: 1,
                seat_number: "21e",
                selected:0,
                
                checked:0
            },
            {
                id: 126,
                class_id: 1,
                seat_number: "21f",
                selected:0,
                
                checked:0
            },
            {
                id: 127,
                class_id: 1,
                seat_number: "22a",
                selected:0,
                
                checked:0
            },
            {
                id: 128,
                class_id: 1,
                seat_number: "22b",
                selected:0,
                
                checked:0
            },
            {
                id: 129,
                class_id: 1,
                seat_number: "22c",
                selected:0,
                
                checked:0
            },
            {
                id: 130,
                class_id: 1,
                seat_number: "22d",
                selected:0,
                
                checked:0
            },
            {
                id: 131,
                class_id: 1,
                seat_number: "22e",
                selected:0,
                
                checked:0
            },
            {
                id: 132,
                class_id: 1,
                seat_number: "22f",
                selected:0,
                
                checked:0
            },
            {
                id: 133,
                class_id: 1,
                seat_number: "23a",
                selected:0,
                
                checked:0
            },
            {
                id: 134,
                class_id: 1,
                seat_number: "23b",
                selected:0,
                
                checked:0
            },
            {
                id: 135,
                class_id: 1,
                seat_number: "23c",
                selected:0,
                
                checked:0
            },
            {
                id: 136,
                class_id: 1,
                seat_number: "23d",
                selected:0,
                
                checked:0
            },
            {
                id: 137,
                class_id: 1,
                seat_number: "23e",
                selected:0,
                
                checked:0
            },
            {
                id: 138,
                class_id: 1,
                seat_number: "23f",
                selected:0,
                checked:0
            },
            {
                id: 139,
                class_id: 1,
                seat_number: "24a",
                selected:0,
                checked:0
            },
            {
                id: 140,
                class_id: 1,
                seat_number: "24b",
                selected:0,
                checked:0
            },
            {
                id: 141,
                class_id: 1,
                seat_number: "24c",
                selected:0,
                checked:0
            },
            {
                id: 142,
                class_id: 1,
                seat_number: "24d",
                selected:0,
                
                checked:0
            },
            {
                id: 143,
                class_id: 1,
                seat_number: "24e",
                selected:0,
                checked:0
            },
            {
                id: 144,
                class_id: 1,
                seat_number: "24f",
                selected:0,
                checked:0
            },
            {
                id: 145,
                class_id: 1,
                seat_number: "25a",
                selected:0,
                
                checked:0
            },
            {
                id: 146,
                class_id: 1,
                seat_number: "25b",
                selected:0,
                checked:0
            },
            {
                id: 147,
                class_id: 1,
                seat_number: "25c",
                selected:0,
                checked:0
            },
            {
                id: 148,
                class_id: 1,
                seat_number: "25d",
                selected:0,
                
                checked:0
            },
            {
                id: 149,
                class_id: 1,
                seat_number: "25e",
                selected:0,
                checked:0
            },
            {
                id: 150,
                class_id: 1,
                seat_number: "25f",
                selected:0,
                checked:0
            },
            {
                id: 151,
                class_id: 1,
                seat_number: "26a",
                selected:0,
                
                checked:0
            },
            {
                id: 152,
                class_id: 1,
                seat_number: "26b",
                selected:0,
                checked:0
            },
            {
                id: 153,
                class_id: 1,
                seat_number: "26c",
                selected:0,
                checked:0
            },
            {
                id: 154,
                class_id: 1,
                seat_number: "26d",
                selected:0,
                
                checked:0
            },
            {
                id: 155,
                class_id: 1,
                seat_number: "26e",
                selected:0,
                checked:0
            },
            {
                id: 156,
                class_id: 1,
                seat_number: "26f",
                selected:0,
                
                checked:0
            },
            {
                id: 157,
                class_id: 1,
                seat_number: "27a",
                selected:0,
                
                checked:0
            },
            {
                id: 158,
                class_id: 1,
                seat_number: "27b",
                selected:0,
                
                checked:0
            },
            {
                id: 159,
                class_id: 1,
                seat_number: "27c",
                
                checked:0
            },
            {
                id: 160,
                class_id: 1,
                seat_number: "27d",
                selected:0,
                
                checked:0
            },
            {
                id: 161,
                class_id: 1,
                seat_number: "27e",
                selected:0,
                
                checked:0
            },
            {
                id: 162,
                class_id: 1,
                seat_number: "27f",
                selected:0,
                
                checked:0
            },
            {
                id: 163,
                class_id: 1,
                seat_number: "28a",
                selected:0,
                
                checked:0
            },
            {
                id: 164,
                class_id: 1,
                seat_number: "28b",
                selected:0,
                checked:0
            },
            {
                id: 165,
                class_id: 1,
                seat_number: "28c",
                selected:0,
                checked:0
            },
            {
                id: 166,
                class_id: 1,
                seat_number: "28d",
                selected:0,
                checked:0
            },
            {
                id: 167,
                class_id: 1,
                seat_number: "28e",
                selected:0,
                checked:0
            },
            {
                id: 168,
                class_id: 1,
                seat_number: "28f",
                selected:0,
                checked:0
            }
        ]
        
    );
    return {seats_plan,seats_plan2,setSeats_plan,setSeats_plan2}

}

export default useAirplane_seats


