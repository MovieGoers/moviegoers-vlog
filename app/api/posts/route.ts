import { NextResponse } from 'next/server'; 
import supabase, { Database } from '@/lib/supabase'; 

export async function GET() {
  try {
    const { data: posts, error } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching posts:', error);
      // NextResponse를 사용하여 JSON 응답과 상태 코드 반환
      return NextResponse.json({ message: 'Error fetching posts', error: error.message }, { status: 500 });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
  }
}