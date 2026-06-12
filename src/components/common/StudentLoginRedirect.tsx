"use client";

import { useEffect } from "react";
import { STUDENT_AUTH_STORAGE_KEYS, STUDENT_LOGIN_URL } from "@/lib/student-login";

function storageHasAuthToken(storage: Storage) {
    return STUDENT_AUTH_STORAGE_KEYS.some((key) => {
        const value = storage.getItem(key);

        return typeof value === "string" && value.trim().length > 0;
    });
}

function hasStudentAuthToken() {
    try {
        if (storageHasAuthToken(window.localStorage)) {
            return true;
        }
    } catch {
        // Ignore unavailable browser storage.
    }

    try {
        if (storageHasAuthToken(window.sessionStorage)) {
            return true;
        }
    } catch {
        // Ignore unavailable browser storage.
    }

    return false;
}

export default function StudentLoginRedirect() {
    useEffect(() => {
        if (hasStudentAuthToken()) {
            window.location.replace(STUDENT_LOGIN_URL);
        }
    }, []);

    return null;
}
