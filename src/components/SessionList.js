import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import SessionItem from './SessionItem';

const API_URL = 'https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions';

const ITEMS_PER_PAGE = 20;

function SessionList({ onSelectSession, selectedSession }) {
  const [allSessions, setAllSessions] = useState([]);
  const [displayedSessions, setDisplayedSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  const lastSessionElementRef = useRef();

  const fetchAllSessions = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_URL}?page=1&per_page=1000`);
      setAllSessions(response.data.chat_sessions);
    } catch (err) {
      setError('Failed to fetch chat sessions. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  useEffect(() => {
    const filteredSessions = allSessions.filter(session => 
      session.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedSessions(filteredSessions.slice(0, ITEMS_PER_PAGE));
    setHasMore(filteredSessions.length > ITEMS_PER_PAGE);
  }, [searchQuery, allSessions]);

  const loadMoreSessions = useCallback(() => {
    const filteredSessions = allSessions.filter(session => 
      session.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentLength = displayedSessions.length;
    const nextSessions = filteredSessions.slice(0, currentLength + ITEMS_PER_PAGE);
    setDisplayedSessions(nextSessions);
    setHasMore(nextSessions.length < filteredSessions.length);
  }, [searchQuery, allSessions, displayedSessions]);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore) {
      loadMoreSessions();
    }
  }, [loadMoreSessions, hasMore]);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (lastSessionElementRef.current) observer.observe(lastSessionElementRef.current);
    return () => {
      if (lastSessionElementRef.current) observer.unobserve(lastSessionElementRef.current);
    };
  }, [handleObserver]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 bg-white sticky top-0 z-10">
        <h2 className="text-xl font-semibold mb-4">Messaging</h2>
        <input
          type="text"
          placeholder="Search sessions..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {displayedSessions.map((session, index) => (
          <SessionItem
            key={session.id}
            session={session}
            onClick={() => onSelectSession(session)}
            ref={index === displayedSessions.length - 1 ? lastSessionElementRef : null}
            isSelected={selectedSession && selectedSession.id === session.id}
          />
        ))}
        {loading && <p className="text-center p-4">Loading...</p>}
        {error && <p className="text-center text-red-500 p-4">{error}</p>}
        {!loading && displayedSessions.length === 0 && <p className="text-center p-4">No sessions found</p>}
        {!loading && !hasMore && displayedSessions.length > 0 && <p className="text-center p-4">No more sessions to load</p>}
      </div>
    </div>
  );
}

export default SessionList;