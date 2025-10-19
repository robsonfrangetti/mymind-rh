import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'API funcionando sem banco!',
    timestamp: new Date().toISOString()
  })
}