import { NextRequest, NextResponse } from "next/server";

export function middleware(req:NextRequest, res:NextResponse) {
    const cookie = req.cookies.get('access');
    // console.log(cookie); esto se ve del lado del servidor (en la consola)
    const url=req.nextUrl.pathname;
    // console.log(url); esto se ve del lado del servidor (en la consola)

    if(url.includes('/admin') && !cookie) {
        return NextResponse.redirect('http://localhost:3000/login');
    }
    return NextResponse.next();

}