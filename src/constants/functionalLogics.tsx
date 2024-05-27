import React from "react"

export  const isNotEmpty = (obj: any) => {
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true; // If it has at least one own property, return true
        }
    }
    return false; // If no own properties found, return false
}