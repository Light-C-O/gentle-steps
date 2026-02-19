'use client';
import { db, auth } from "@/data/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

//Firebase auth listener to detect logged-in user
import {onAuthStateChanged} from "firebase/auth";