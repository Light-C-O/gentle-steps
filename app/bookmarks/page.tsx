'use client';
import {useState, useEffect} from "react";
import { db } from "@/data/firebase";
import {getAuth} from "firebase/auth";
import { collection, getDocs} from "firebase/firestore";
import Button from "@/components/button";

type Bookmark = {
    title: string;
    chapterTitle: string;
    sectionTitle: string
    createdAt: any;
}

export default function BookmarkPage() {


    return(<div></div>)
}