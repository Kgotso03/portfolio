import React, { useState } from "react";
import {
  Lock, Unlock, Settings, Plus, Trash2, Save, X, Eye, LogOut, Check
} from "lucide-react";

export default function AdminPanel({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  projects,
  onUpdateProjects
}) {
  const [pin, setPin] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState("profile"); // "profile" | "projects" | "export"

  // Form states for profile
  const [profileForm, setProfileForm] = useState({ ...profile });

  // Form states for new project
  const [newProject, setNewProject] = useState({
    name: "",
    type: "WEB APPLICATION",
    description: "",
    tags: "",
    status: "In development",
    accent: "violet"
  });

  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    // Default PIN is 1234, or saved PIN
    const savedPin = localStorage.getItem("portfolio_admin_pin") || "1234";
    if (pin === savedPin) {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Incorrect PIN. Default is 1234.");
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    onUpdateProfile(profileForm);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!newProject.name.trim()) return;

    const tagsArray = newProject.tags
      .split(",")
      .map(t => t.trim())
      .filter(Boolean);

    const projectToAdd = {
      number: String(projects.length + 1).padStart(2, "0"),
      name: newProject.name,
      type: newProject.type || "WEB APPLICATION",
      description: newProject.description,
      tags: tagsArray.length > 0 ? tagsArray : ["React", "JavaScript"],
      status: newProject.status,
      accent: newProject.accent
    };

    onUpdateProjects([...projects, projectToAdd]);
    setNewProject({
      name: "",
      type: "WEB APPLICATION",
      description: "",
      tags: "",
      status: "In development",
      accent: "violet"
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  const handleDeleteProject = (indexToDelete) => {
    if (window.confirm("Are you sure you want to remove this project?")) {
      const updated = projects
        .filter((_, idx) => idx !== indexToDelete)
        .map((p, idx) => ({ ...p, number: String(idx + 1).padStart(2, "0") }));
      onUpdateProjects(updated);
    }
  };

  const generateExportCode = () => {
    return `// ==========================================
// 🔗 UPDATED PROFILE LINKS
// ==========================================
export const PROFILE_LINKS = ${JSON.stringify(profileForm, null, 2)};

// ==========================================
// 🚀 UPDATED PROJECTS LIST
// ==========================================
export const projects = ${JSON.stringify(projects, null, 2)};`;
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <div style={headerStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={iconBadgeStyle}>
              {isAuthenticated ? <Settings size={18} color="#a78bfa" /> : <Lock size={18} color="#67e8f9" />}
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#eef0fb" }}>Portfolio Admin Panel</h3>
              <span style={{ fontSize: "11px", color: "#8a96b3" }}>
                {isAuthenticated ? "Logged in as Owner" : "Security Verification"}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={closeButtonStyle} title="Close">
            <X size={18} />
          </button>
        </div>

        {!isAuthenticated ? (
          <form onSubmit={handleLogin} style={{ padding: "30px 24px" }}>
            <p style={{ color: "#aeb6cb", fontSize: "13px", lineHeight: 1.6, marginTop: 0 }}>
              Enter your Admin PIN to manage your portfolio content, profile links, and projects.
            </p>
            <div style={{ marginBottom: "18px" }}>
              <label style={labelStyle}>Admin PIN (Default: 1234)</label>
              <input
                type="password"
                placeholder="Enter 1234"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                autoFocus
                style={inputStyle}
              />
              {authError && <div style={{ color: "#f87171", fontSize: "12px", marginTop: "6px" }}>{authError}</div>}
            </div>
            <button type="submit" style={primaryButtonStyle}>
              <Unlock size={16} /> Unlock Admin Controls
            </button>
          </form>
        ) : (
          <div>
            <div style={tabBarStyle}>
              <button
                onClick={() => setActiveTab("profile")}
                style={activeTab === "profile" ? activeTabStyle : tabStyle}
              >
                Profile & Links
              </button>
              <button
                onClick={() => setActiveTab("projects")}
                style={activeTab === "projects" ? activeTabStyle : tabStyle}
              >
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("export")}
                style={activeTab === "export" ? activeTabStyle : tabStyle}
              >
                Export Code
              </button>
              <button
                onClick={() => setIsAuthenticated(false)}
                style={{ ...tabStyle, marginLeft: "auto", color: "#f87171" }}
                title="Log out"
              >
                <LogOut size={14} />
              </button>
            </div>

            <div style={{ padding: "20px 24px", maxHeight: "65vh", overflowY: "auto" }}>
              {savedNotice && (
                <div style={noticeStyle}>
                  <Check size={16} color="#5ee6b0" /> Changes updated live on your portfolio!
                </div>
              )}

              {activeTab === "profile" && (
                <form onSubmit={handleSaveProfile}>
                  <div style={{ display: "grid", gap: "14px" }}>
                    <div>
                      <label style={labelStyle}>Profile Picture URL (or /profile.jpg)</label>
                      <input
                        type="text"
                        placeholder="https://github.com/Kgotso03.png or /profile.jpg"
                        value={profileForm.avatar || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, avatar: e.target.value })}
                        style={inputStyle}
                      />
                      <div style={{ display: "flex", gap: "8px", marginTop: "6px" }}>
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, avatar: "https://github.com/Kgotso03.png" })}
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(170,184,224,0.2)", color: "#67e8f9", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}
                        >
                          Use GitHub Avatar
                        </button>
                        <button
                          type="button"
                          onClick={() => setProfileForm({ ...profileForm, avatar: "/profile.jpg" })}
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(170,184,224,0.2)", color: "#c4b5fd", padding: "4px 8px", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}
                        >
                          Use /profile.jpg
                        </button>
                      </div>
                    </div>
                    <div>
                      <label style={labelStyle}>LinkedIn URL</label>
                      <input
                        type="url"
                        value={profileForm.linkedin || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>GitHub URL</label>
                      <input
                        type="url"
                        value={profileForm.github || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email Address</label>
                      <input
                        type="email"
                        value={profileForm.email || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Graduation / Education Status</label>
                      <input
                        type="text"
                        value={profileForm.graduation || ""}
                        onChange={(e) => setProfileForm({ ...profileForm, graduation: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                  </div>
                  <button type="submit" style={{ ...primaryButtonStyle, marginTop: "20px" }}>
                    <Save size={16} /> Save Profile Changes
                  </button>
                </form>
              )}

              {activeTab === "projects" && (
                <div>
                  <h4 style={{ color: "#c4b5fd", margin: "0 0 12px", fontSize: "14px" }}>Current Projects</h4>
                  <div style={{ display: "grid", gap: "10px", marginBottom: "25px" }}>
                    {projects.map((proj, idx) => (
                      <div key={idx} style={projectRowStyle}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <strong style={{ color: "#eef0fb", fontSize: "13px" }}>{proj.number}. {proj.name}</strong>
                            <span style={{ fontSize: "10px", color: "#67e8f9" }}>{proj.type}</span>
                          </div>
                          <p style={{ margin: "4px 0", fontSize: "11px", color: "#9da7c0" }}>{proj.description}</p>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                            {proj.tags.map((t, i) => (
                              <span key={i} style={tagPillStyle}>{t}</span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(idx)}
                          style={deleteButtonStyle}
                          title="Delete Project"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <h4 style={{ color: "#67e8f9", margin: "20px 0 12px", fontSize: "14px" }}>Add New Project</h4>
                  <form onSubmit={handleAddProject} style={{ display: "grid", gap: "12px", background: "rgba(255,255,255,0.02)", padding: "16px", borderRadius: "8px", border: "1px solid rgba(170,184,224,0.12)" }}>
                    <div>
                      <label style={labelStyle}>Project Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Campus Food Delivery"
                        value={newProject.name}
                        onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Category / Subtitle</label>
                      <input
                        type="text"
                        placeholder="e.g. FULL STACK · REACT & NODE"
                        value={newProject.type}
                        onChange={(e) => setNewProject({ ...newProject, type: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Description</label>
                      <textarea
                        rows={2}
                        placeholder="Brief summary of what the project does..."
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        style={{ ...inputStyle, resize: "vertical" }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Tech Stack Tags (comma separated)</label>
                      <input
                        type="text"
                        placeholder="React, Node.js, PostgreSQL"
                        value={newProject.tags}
                        onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <button type="submit" style={primaryButtonStyle}>
                      <Plus size={16} /> Add Project
                    </button>
                  </form>
                </div>
              )}

              {activeTab === "export" && (
                <div>
                  <p style={{ color: "#aeb6cb", fontSize: "12px", lineHeight: 1.6, marginTop: 0 }}>
                    Any edits you make in this admin panel save to your browser instantly. If you want to make them permanent in your code, copy this snippet into <code>src/App.jsx</code>:
                  </p>
                  <pre style={codeBoxStyle}>{generateExportCode()}</pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateExportCode());
                      alert("Code snippet copied to clipboard!");
                    }}
                    style={primaryButtonStyle}
                  >
                    Copy Snippet to Clipboard
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Inline Styles for crisp presentation
const overlayStyle = {
  position: "fixed",
  inset: 0,
  backgroundColor: "rgba(7, 10, 20, 0.8)",
  backdropFilter: "blur(8px)",
  display: "grid",
  placeItems: "center",
  zIndex: 9999,
  padding: "20px"
};

const modalStyle = {
  width: "min(580px, 100%)",
  background: "#11182b",
  border: "1px solid rgba(167, 139, 250, 0.3)",
  borderRadius: "14px",
  boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 40px rgba(167, 139, 250, 0.15)",
  overflow: "hidden"
};

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "16px 24px",
  borderBottom: "1px solid rgba(170, 184, 224, 0.12)",
  background: "rgba(255,255,255,0.015)"
};

const iconBadgeStyle = {
  width: "36px",
  height: "36px",
  borderRadius: "9px",
  display: "grid",
  placeItems: "center",
  background: "rgba(167, 139, 250, 0.12)",
  border: "1px solid rgba(167, 139, 250, 0.2)"
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  color: "#9da7c0",
  cursor: "pointer",
  padding: "6px",
  display: "grid",
  placeItems: "center",
  borderRadius: "6px"
};

const tabBarStyle = {
  display: "flex",
  borderBottom: "1px solid rgba(170, 184, 224, 0.12)",
  padding: "0 20px",
  background: "rgba(0,0,0,0.2)"
};

const tabStyle = {
  background: "none",
  border: "none",
  color: "#8a96b3",
  padding: "12px 16px",
  fontSize: "12px",
  cursor: "pointer",
  borderBottom: "2px solid transparent"
};

const activeTabStyle = {
  ...tabStyle,
  color: "#67e8f9",
  borderBottom: "2px solid #67e8f9",
  fontWeight: "bold"
};

const labelStyle = {
  display: "block",
  fontSize: "11px",
  color: "#9da7c0",
  marginBottom: "6px",
  textTransform: "uppercase",
  letterSpacing: "0.5px"
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#0b1020",
  border: "1px solid rgba(170, 184, 224, 0.2)",
  borderRadius: "7px",
  padding: "10px 14px",
  color: "#eef0fb",
  fontSize: "13px",
  outline: "none"
};

const primaryButtonStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  width: "100%",
  padding: "12px",
  background: "linear-gradient(100deg, #c4b5fd, #67e8f9)",
  color: "#101325",
  border: "none",
  borderRadius: "7px",
  fontSize: "13px",
  fontWeight: "bold",
  cursor: "pointer"
};

const deleteButtonStyle = {
  background: "rgba(248, 113, 113, 0.1)",
  border: "1px solid rgba(248, 113, 113, 0.25)",
  color: "#f87171",
  borderRadius: "6px",
  padding: "8px",
  cursor: "pointer",
  display: "grid",
  placeItems: "center"
};

const projectRowStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 14px",
  borderRadius: "8px",
  background: "rgba(255,255,255,0.02)",
  border: "1px solid rgba(170, 184, 224, 0.1)"
};

const tagPillStyle = {
  fontSize: "9px",
  padding: "3px 7px",
  borderRadius: "4px",
  background: "rgba(167, 139, 250, 0.1)",
  color: "#c4b5fd"
};

const noticeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 14px",
  borderRadius: "7px",
  background: "rgba(94, 230, 176, 0.12)",
  border: "1px solid rgba(94, 230, 176, 0.3)",
  color: "#5ee6b0",
  fontSize: "12px",
  marginBottom: "14px"
};

const codeBoxStyle = {
  background: "#080c18",
  padding: "14px",
  borderRadius: "8px",
  border: "1px solid rgba(170, 184, 224, 0.12)",
  color: "#9ee6c1",
  fontSize: "11px",
  overflowX: "auto",
  maxHeight: "180px",
  marginBottom: "12px"
};
