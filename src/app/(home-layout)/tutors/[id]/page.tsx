'use client'

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import teacherimg from '@/assets/teacher.jpg';
import Link from 'next/link';

type Tutor = {
  _id: string;
  userId: {
    _id: string;
    name: string;
    profileImg?: string;
    email?: string;
    phone?: string;
    bio?: string;
  };
  subject: string;
  address: string;
  experience: number;
  hourlyRate?: number;
  education?: string[];
  teachingMethods?: string;
  availability?: string[];
};

export default function TutorProfile() {
  const params = useParams();
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/tutors/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch tutor');
        const data = await res.json();
        setTutor(data.data || data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load tutor');
      } finally {
        setLoading(false);
      }
    };

    fetchTutor();
  }, [params.id]);

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!tutor) return <div className="text-center py-20">Tutor not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-cDeepBlue text-white p-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white">
              <Image
                src={tutor.userId.profileImg || teacherimg}
                alt={tutor.userId.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">{tutor.userId.name}</h1>
              <p className="text-lg">{tutor.subject} Tutor</p>
              <p className="flex items-center gap-1 mt-2">
                <span>📍</span>
                <span>{tutor.address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 grid md:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="md:col-span-2">
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-cDeepBlue">About Me</h2>
              <p className="text-gray-700">
                {tutor.userId.bio || 'No bio provided yet.'}
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4 text-cDeepBlue">Teaching Method</h2>
              <p className="text-gray-700">
                {tutor.teachingMethods || 'Not specified.'}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4 text-cDeepBlue">Education</h2>
              {tutor.education?.length ? (
                <ul className="list-disc pl-5 text-gray-700">
                  {tutor.education.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">Not specified.</p>
              )}
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Hourly Rate</h3>
              <p className="text-2xl font-bold text-cOrange">
                ${tutor.hourlyRate || 'Not specified'}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Experience</h3>
              <p className="text-lg">
                {tutor.experience} {tutor.experience === 1 ? 'year' : 'years'}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Availability</h3>
              {tutor.availability?.length ? (
                <ul className="space-y-1">
                  {tutor.availability.map((day, i) => (
                    <li key={i} className="flex items-center">
                      <span className="w-2 h-2 bg-cOrange rounded-full mr-2"></span>
                      {day}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Not specified</p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Contact</h3>
              <p className="mb-1">{tutor.userId.email}</p>
              {tutor.userId.phone && <p>{tutor.userId.phone}</p>}
            </div>

            <button className="w-full bg-cOrange text-white py-3 rounded-lg font-semibold hover:bg-cDeepBlue transition">
              Book a Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}