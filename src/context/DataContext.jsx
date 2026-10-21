import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  INITIAL_JOBS,
  INITIAL_POSTS,
  INITIAL_CONNECTIONS,
  INITIAL_SUGGESTIONS,
  INITIAL_REQUESTS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS,
  INITIAL_APPLICANTS,
  INITIAL_REPORTS
} from '../data/initialData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const DataContext = createContext(null);

const STORAGE_KEYS = {
  JOBS: 'hirelynk_jobs',
  SAVED_JOBS: 'hirelynk_saved_jobs',
  APPLIED_JOBS: 'hirelynk_applied_jobs',
  POSTS: 'hirelynk_posts',
  CONNECTIONS: 'hirelynk_connections',
  SUGGESTIONS: 'hirelynk_suggestions',
  REQUESTS: 'hirelynk_requests',
  CONVERSATIONS: 'hirelynk_conversations',
  NOTIFICATIONS: 'hirelynk_notifications',
  APPLICANTS: 'hirelynk_applicants',
  REPORTS: 'hirelynk_reports'
};

const getStored = (key, fallback) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from storage:`, err);
    return fallback;
  }
};

export const DataProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { success, info } = useToast();

  // State slices
  const [jobs, setJobs] = useState(() => getStored(STORAGE_KEYS.JOBS, INITIAL_JOBS));
  const [savedJobIds, setSavedJobIds] = useState(() => getStored(STORAGE_KEYS.SAVED_JOBS, ['job-1', 'job-3']));
  const [appliedJobIds, setAppliedJobIds] = useState(() => getStored(STORAGE_KEYS.APPLIED_JOBS, ['job-1']));
  const [posts, setPosts] = useState(() => getStored(STORAGE_KEYS.POSTS, INITIAL_POSTS));
  const [connections, setConnections] = useState(() => getStored(STORAGE_KEYS.CONNECTIONS, INITIAL_CONNECTIONS));
  const [suggestions, setSuggestions] = useState(() => getStored(STORAGE_KEYS.SUGGESTIONS, INITIAL_SUGGESTIONS));
  const [requests, setRequests] = useState(() => getStored(STORAGE_KEYS.REQUESTS, INITIAL_REQUESTS));
  const [conversations, setConversations] = useState(() => getStored(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS));
  const [notifications, setNotifications] = useState(() => getStored(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS));
  const [applicants, setApplicants] = useState(() => getStored(STORAGE_KEYS.APPLICANTS, INITIAL_APPLICANTS));
  const [reports, setReports] = useState(() => getStored(STORAGE_KEYS.REPORTS, INITIAL_REPORTS));

  // Sync state to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONNECTIONS, JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUGGESTIONS, JSON.stringify(suggestions));
  }, [suggestions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONVERSATIONS, JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLICANTS, JSON.stringify(applicants));
  }, [applicants]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  }, [reports]);

  // ==========================================
  // JOBS ACTIONS
  // ==========================================
  const toggleSaveJob = useCallback((jobId) => {
    setSavedJobIds((prev) => {
      const exists = prev.includes(jobId);
      if (exists) {
        info('Job removed from saved items');
        return prev.filter((id) => id !== jobId);
      } else {
        success('Job saved to your bookmarks!');
        return [...prev, jobId];
      }
    });
  }, [info, success]);

  const applyToJob = useCallback((jobId, applicationDetails = {}) => {
    if (appliedJobIds.includes(jobId)) {
      info('You have already applied to this position.');
      return;
    }

    const job = jobs.find((j) => j.id === jobId);
    const newApplicant = {
      id: 'app-' + Date.now(),
      jobId,
      jobTitle: job ? job.title : 'Software Role',
      candidateId: currentUser?.id || 'guest',
      candidateName: currentUser?.name || 'Candidate',
      candidateEmail: currentUser?.email || 'candidate@example.com',
      candidateHeadline: currentUser?.headline || 'Tech Professional',
      candidateAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      location: currentUser?.location || 'Remote',
      experienceYears: applicationDetails.experienceYears || '5+ years',
      appliedDate: 'Just now',
      stage: 'Applied',
      rating: 5,
      coverNote: applicationDetails.coverNote || 'Looking forward to discussing how my experience fits the team!',
      resumeFileName: applicationDetails.resumeFileName || currentUser?.resume?.fileName || 'Resume_2026.pdf'
    };

    setAppliedJobIds((prev) => [...prev, jobId]);
    setApplicants((prev) => [newApplicant, ...prev]);

    // Update job applicant count
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: (j.applicantsCount || 0) + 1 } : j))
    );

    // Add notification
    const newNotification = {
      id: 'notif-' + Date.now(),
      type: 'application',
      title: 'Application Submitted!',
      message: `Your application for '${job?.title}' at ${job?.company} was successfully received.`,
      timeAgo: 'Just now',
      read: false,
      link: '/jobs'
    };
    setNotifications((prev) => [newNotification, ...prev]);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // safely fallback
    }

    success(`Application submitted to ${job?.company || 'company'}!`);
  }, [appliedJobIds, jobs, currentUser, success, info]);

  const postNewJob = useCallback((jobData) => {
    const newJob = {
      id: 'job-' + Date.now(),
      title: jobData.title,
      company: jobData.company || currentUser?.company || 'Tech Innovations Inc.',
      companyLogo: jobData.companyLogo || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&auto=format&fit=crop&q=80',
      location: jobData.location,
      workMode: jobData.workMode || 'Remote',
      type: jobData.type || 'Full-time',
      experience: jobData.experience || 'Mid-Senior',
      salary: jobData.salary || '$130,000 - $170,000 / yr',
      postedDate: 'Just now',
      applicantsCount: 0,
      recruiterId: currentUser?.id || 'user-2',
      status: 'active',
      featured: jobData.featured || false,
      skills: Array.isArray(jobData.skills) ? jobData.skills : (jobData.skills || '').split(',').map(s => s.trim()).filter(Boolean),
      description: jobData.description,
      responsibilities: jobData.responsibilities || [
        'Deliver reliable, scalable system architecture and clean code.',
        'Collaborate cross-functionally across engineering, product, and design.',
        'Participate in sprint planning and design critiques.'
      ],
      requirements: jobData.requirements || [
        '3+ years relevant industry experience in high-growth environments.',
        'Proven expertise in relevant domain technologies and communication skills.'
      ],
      benefits: jobData.benefits || ['Comprehensive healthcare', 'Flexible PTO', 'Equity grant']
    };

    setJobs((prev) => [newJob, ...prev]);
    success(`Job "${newJob.title}" posted successfully!`);
    return newJob;
  }, [currentUser, success]);

  const deleteJob = useCallback((jobId) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setApplicants((prev) => prev.filter((a) => a.jobId !== jobId));
    info('Job listing removed.');
  }, [info]);

  const updateJobStatus = useCallback((jobId, newStatus) => {
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
    );
    success(`Job status updated to ${newStatus}`);
  }, [success]);

  // ==========================================
  // POSTS ACTIONS
  // ==========================================
  const createPost = useCallback((content, tags = [], image = null) => {
    const newPost = {
      id: 'post-' + Date.now(),
      authorId: currentUser?.id || 'guest',
      authorName: currentUser?.name || 'Lynk Professional',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      authorHeadline: currentUser?.headline || 'Tech Specialist',
      timeAgo: 'Just now',
      content,
      tags: tags.length ? tags : ['#HireLynk', '#TechCareers'],
      image,
      likesCount: 0,
      hasLiked: false,
      sharesCount: 0,
      comments: []
    };

    setPosts((prev) => [newPost, ...prev]);
    success('Your post has been published to the network feed!');
    return newPost;
  }, [currentUser, success]);

  const likePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const wasLiked = p.hasLiked;
          return {
            ...p,
            hasLiked: !wasLiked,
            likesCount: wasLiked ? p.likesCount - 1 : p.likesCount + 1
          };
        }
        return p;
      })
    );
  }, []);

  const addComment = useCallback((postId, text) => {
    if (!text.trim()) return;
    const newComment = {
      id: 'c-' + Date.now(),
      authorName: currentUser?.name || 'Sarah Jenkins',
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      authorHeadline: currentUser?.headline || 'Member',
      text,
      timeAgo: 'Just now'
    };

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          return {
            ...p,
            comments: [...(p.comments || []), newComment]
          };
        }
        return p;
      })
    );
    success('Comment posted!');
  }, [currentUser, success]);

  const sharePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, sharesCount: (p.sharesCount || 0) + 1 } : p))
    );
    success('Post link copied and shared to your feed!');
  }, [success]);

  // ==========================================
  // NETWORK ACTIONS
  // ==========================================
  const acceptConnectionRequest = useCallback((requestId) => {
    const req = requests.find((r) => r.id === requestId);
    if (!req) return;

    const newConnection = {
      id: 'conn-' + Date.now(),
      userId: 'user-' + Date.now(),
      name: req.name,
      headline: req.headline,
      avatar: req.avatar,
      mutualCount: req.mutualCount || 10,
      status: 'connected',
      connectedDate: 'Just now'
    };

    setConnections((prev) => [newConnection, ...prev]);
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    success(`You are now connected with ${req.name}!`);
  }, [requests, success]);

  const rejectConnectionRequest = useCallback((requestId) => {
    setRequests((prev) => prev.filter((r) => r.id !== requestId));
    info('Connection request ignored.');
  }, [info]);

  const sendConnectionRequest = useCallback((suggestionId) => {
    const sug = suggestions.find((s) => s.id === suggestionId);
    if (!sug) return;

    setSuggestions((prev) => prev.filter((s) => s.id !== suggestionId));
    success(`Connection invitation sent to ${sug.name}`);
  }, [suggestions, success]);

  const removeConnection = useCallback((connectionId) => {
    setConnections((prev) => prev.filter((c) => c.id !== connectionId));
    info('Connection removed.');
  }, [info]);

  // ==========================================
  // MESSAGES ACTIONS
  // ==========================================
  const sendMessage = useCallback((conversationId, text) => {
    if (!text.trim()) return;

    const newMsg = {
      id: 'm-' + Date.now(),
      senderId: currentUser?.id || 'user-1',
      text,
      timestamp: 'Just now'
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            lastMessage: text,
            lastTimestamp: 'Just now',
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      })
    );

    // Simulate smart auto-reply after 2.5 seconds
    setTimeout(() => {
      const conv = conversations.find((c) => c.id === conversationId);
      const recipientName = conv ? conv.participantName : 'Recruiter';
      
      const autoReplyReplies = [
        `Thanks for the note, ${currentUser?.name || 'Sarah'}! That aligns really well with what we're looking for. Let me coordinate with the team!`,
        `Appreciate your message! I'm reviewing the details right now and will circle back with calendar availability shortly.`,
        `Great point! Let's schedule a 20-minute Zoom sync. Are afternoons generally good for you?`
      ];
      const replyText = autoReplyReplies[Math.floor(Math.random() * autoReplyReplies.length)];

      const replyMsg = {
        id: 'reply-' + Date.now(),
        senderId: conv ? conv.participantId : 'recruiter',
        text: replyText,
        timestamp: 'Just now'
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === conversationId) {
            return {
              ...c,
              unreadCount: (c.unreadCount || 0) + 1,
              lastMessage: replyText,
              lastTimestamp: 'Just now',
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );

      // Notification for incoming message
      setNotifications((prev) => [
        {
          id: 'notif-' + Date.now(),
          type: 'message',
          title: `New message from ${recipientName}`,
          message: replyText.substring(0, 65) + '...',
          timeAgo: 'Just now',
          read: false,
          link: '/messaging'
        },
        ...prev
      ]);
    }, 2500);
  }, [currentUser, conversations]);

  const startOrOpenConversation = useCallback((user) => {
    // Check if conversation exists
    let existing = conversations.find(
      (c) => c.participantId === user.id || c.participantName.toLowerCase() === user.name.toLowerCase()
    );
    if (!existing) {
      existing = {
        id: 'conv-' + Date.now(),
        participantId: user.id || 'user-' + Date.now(),
        participantName: user.name,
        participantHeadline: user.headline || 'Professional on HireLynk',
        participantAvatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        online: true,
        unreadCount: 0,
        lastMessage: 'Conversation started',
        lastTimestamp: 'Just now',
        messages: [
          {
            id: 'm-init',
            senderId: user.id,
            text: `Hi ${currentUser?.name || 'there'}, thanks for connecting! Looking forward to chatting.`,
            timestamp: 'Just now'
          }
        ]
      };
      setConversations((prev) => [existing, ...prev]);
    }
    return existing.id;
  }, [conversations, currentUser]);

  // ==========================================
  // NOTIFICATIONS ACTIONS
  // ==========================================
  const markNotificationRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    success('All notifications marked as read.');
  }, [success]);

  const deleteNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  // ==========================================
  // ATS / APPLICANTS ACTIONS
  // ==========================================
  const updateApplicantStage = useCallback((applicantId, newStage) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === applicantId ? { ...a, stage: newStage } : a))
    );
    success(`Candidate moved to "${newStage}" stage.`);
  }, [success]);

  // ==========================================
  // ADMIN REPORTS ACTIONS
  // ==========================================
  const resolveReport = useCallback((reportId, actionTaken = 'Approved') => {
    setReports((prev) =>
      prev.map((r) => (r.id === reportId ? { ...r, status: `Resolved (${actionTaken})` } : r))
    );
    success(`Report resolved with action: ${actionTaken}`);
  }, [success]);

  // ==========================================
  // RESET DEMO DATA
  // ==========================================
  const resetAllDemoData = useCallback(() => {
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k));
    setJobs(INITIAL_JOBS);
    setSavedJobIds(['job-1', 'job-3']);
    setAppliedJobIds(['job-1']);
    setPosts(INITIAL_POSTS);
    setConnections(INITIAL_CONNECTIONS);
    setSuggestions(INITIAL_SUGGESTIONS);
    setRequests(INITIAL_REQUESTS);
    setConversations(INITIAL_CONVERSATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setApplicants(INITIAL_APPLICANTS);
    setReports(INITIAL_REPORTS);
    info('HireLynk demo data has been reset to original state.');
  }, [info]);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <DataContext.Provider
      value={{
        jobs,
        savedJobIds,
        appliedJobIds,
        toggleSaveJob,
        applyToJob,
        postNewJob,
        deleteJob,
        updateJobStatus,
        posts,
        createPost,
        likePost,
        addComment,
        sharePost,
        connections,
        suggestions,
        requests,
        acceptConnectionRequest,
        rejectConnectionRequest,
        sendConnectionRequest,
        removeConnection,
        conversations,
        sendMessage,
        startOrOpenConversation,
        unreadMessagesCount,
        notifications,
        unreadNotificationsCount,
        markNotificationRead,
        markAllNotificationsRead,
        deleteNotification,
        applicants,
        updateApplicantStage,
        reports,
        resolveReport,
        resetAllDemoData
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
