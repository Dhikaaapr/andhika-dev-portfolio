import { useState, useEffect } from 'react';
import {
  getHero,
  getAbout,
  getSkills,
  getProjects,
  getExperiences,
  getEducation,
  getSettings,
} from '../firebase/services';
import {
  HERO,
  ABOUT,
  SKILLS,
  PROJECTS,
  EXPERIENCES,
  EDUCATION,
  SOCIAL_LINKS,
  CONTACT,
} from '../data/constants';

/**
 * Generic hook for fetching Firebase data with static fallback
 */
function useFirebaseSection(fetchFn, fallbackData) {
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const result = await fetchFn();
        if (!cancelled && result) {
          if (Array.isArray(result) && result.length === 0) {
            setData(fallbackData);
          } else {
            setData(result);
          }
        }
      } catch (err) {
        console.warn('Firebase fetch failed, using static data:', err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

/**
 * Hook that MERGES Firebase data with static data (for collections like projects)
 * Firebase items come first, then static items that don't already exist in Firebase
 */
function useFirebaseMerged(fetchFn, staticData, nameKey = 'name') {
  const [data, setData] = useState(staticData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const firebaseItems = await fetchFn();
        if (!cancelled && Array.isArray(firebaseItems) && firebaseItems.length > 0) {
          // Get names from Firebase items for deduplication
          const firebaseNames = new Set(
            firebaseItems.map((item) => (item[nameKey] || '').toLowerCase())
          );
          // Keep static items that are NOT already in Firebase
          const uniqueStaticItems = staticData.filter(
            (item) => !firebaseNames.has((item[nameKey] || '').toLowerCase())
          );
          // Firebase first, then remaining static items
          setData([...firebaseItems, ...uniqueStaticItems]);
        }
      } catch (err) {
        console.warn('Firebase fetch failed, using static data:', err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

// ==================== Individual hooks ====================

export function useHeroData() {
  return useFirebaseSection(getHero, HERO);
}

export function useAboutData() {
  const { data, loading } = useFirebaseSection(getAbout, ABOUT);
  const merged = {
    ...ABOUT,
    ...data,
    description: data?.description?.length > 0 ? data.description : ABOUT.description,
    stats: data?.stats?.length > 0 ? data.stats : ABOUT.stats,
  };
  return { data: merged, loading };
}

export function useSkillsData() {
  return useFirebaseMerged(getSkills, [], 'name');
}

export function useProjectsData() {
  return useFirebaseMerged(getProjects, PROJECTS, 'name');
}

export function useExperiencesData() {
  return useFirebaseMerged(getExperiences, EXPERIENCES, 'company');
}

export function useEducationData() {
  const { data, loading } = useFirebaseSection(getEducation, EDUCATION);
  const merged = {
    ...EDUCATION,
    ...data,
    degree: { ...EDUCATION.degree, ...(data?.degree || {}) },
    achievements: data?.achievements?.length > 0 ? data.achievements : EDUCATION.achievements,
    overview: data?.overview || EDUCATION.overview,
  };
  return { data: merged, loading };
}

export function useSettingsData() {
  return useFirebaseSection(getSettings, {});
}
