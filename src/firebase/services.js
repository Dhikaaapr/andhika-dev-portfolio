import { supabase } from './config';

// ==================== PROJECTS ====================
export async function getProjects() {
  const { data, error } = await supabase.from('projects').select('*').order('order', { ascending: true });
  if (error) {
    console.warn('Projects fetch failed:', error.message);
    return [];
  }
  return data || [];
}

export async function addProject(data) {
  const { data: inserted, error } = await supabase.from('projects').insert([data]).select();
  if (error) throw error;
  return inserted[0];
}

export async function updateProject(id, data) {
  const { error } = await supabase.from('projects').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteProject(id) {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
}

// ==================== SKILLS ====================
export async function getSkills() {
  const { data, error } = await supabase.from('skills').select('*').order('order', { ascending: true });
  if (error) {
    console.warn('Skills fetch failed:', error.message);
    return [];
  }
  return data || [];
}

export async function addSkill(data) {
  const { data: inserted, error } = await supabase.from('skills').insert([data]).select();
  if (error) throw error;
  return inserted[0];
}

export async function updateSkill(id, data) {
  const { error } = await supabase.from('skills').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteSkill(id) {
  const { error } = await supabase.from('skills').delete().eq('id', id);
  if (error) throw error;
}

// ==================== EXPERIENCES ====================
export async function getExperiences() {
  const { data, error } = await supabase.from('experiences').select('*').order('order', { ascending: true });
  if (error) {
    console.warn('Experiences fetch failed:', error.message);
    return [];
  }
  return data || [];
}

export async function addExperience(data) {
  const { data: inserted, error } = await supabase.from('experiences').insert([data]).select();
  if (error) throw error;
  return inserted[0];
}

export async function updateExperience(id, data) {
  const { error } = await supabase.from('experiences').update(data).eq('id', id);
  if (error) throw error;
}

export async function deleteExperience(id) {
  const { error } = await supabase.from('experiences').delete().eq('id', id);
  if (error) throw error;
}

// ==================== EDUCATION ====================
export async function getEducation() {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 'education').single();
  return data?.data || null;
}

export async function updateEducation(data) {
  const payload = { id: 'education', data: data };
  const { error } = await supabase.from('site_content').upsert(payload, { onConflict: 'id' });
  if (error) throw error;
}

// ==================== HERO SECTION ====================
export async function getHero() {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 'hero').single();
  return data?.data || null;
}

export async function updateHero(data) {
  const payload = { id: 'hero', data: data };
  const { error } = await supabase.from('site_content').upsert(payload, { onConflict: 'id' });
  if (error) throw error;
}

// ==================== ABOUT SECTION ====================
export async function getAbout() {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 'about').single();
  return data?.data || null;
}

export async function updateAbout(data) {
  const payload = { id: 'about', data: data };
  const { error } = await supabase.from('site_content').upsert(payload, { onConflict: 'id' });
  if (error) throw error;
}

// ==================== MESSAGES ====================
export async function getMessages() {
  const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}

export async function markMessageRead(id) {
  const { error } = await supabase.from('messages').update({ "isRead": true }).eq('id', id);
  if (error) throw error;
}

export async function deleteMessage(id) {
  const { error } = await supabase.from('messages').delete().eq('id', id);
  if (error) throw error;
}

export async function getUnreadMessageCount() {
  const { count, error } = await supabase.from('messages').select('*', { count: 'exact', head: true }).eq('isRead', false);
  return count || 0;
}

// ==================== SETTINGS ====================
export async function getSettings() {
  const { data, error } = await supabase.from('site_content').select('data').eq('id', 'settings').single();
  return data?.data || null;
}

export async function updateSettings(data) {
  const payload = { id: 'settings', data: data };
  const { error } = await supabase.from('site_content').upsert(payload, { onConflict: 'id' });
  if (error) throw error;
}

// ==================== FILE UPLOAD (CLOUDINARY) ====================
export async function uploadFile(file) {
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !uploadPreset) {
    throw new Error('Cloudinary config missing in .env');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.secure_url;
}

export async function deleteFile(path) {
  // Cloudinary deletion usually requires back-end signature. 
  // For now, we just skip it or perform it via Cloudinary dashboard.
  console.log('Delete called for:', path);
  return true;
}

// ==================== DASHBOARD STATS ====================
export async function getDashboardStats() {
  const [{ count: projectCount }, { count: messageCount }, { count: unreadCount }, settings] = await Promise.all([
    supabase.from('projects').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('isRead', false),
    getSettings(),
  ]);

  return {
    totalProjects: projectCount || 0,
    totalMessages: messageCount || 0,
    newMessages: unreadCount || 0,
    totalViews: settings?.totalViews || 0,
    cvDownloads: settings?.cvDownloads || 0,
  };
}
