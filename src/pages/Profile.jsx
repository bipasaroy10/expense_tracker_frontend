import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getUserProfile, updateUserProfile } from "../api/auth.api";
import { useAuth } from "../context/auth.context";
import Loader from "../components/loader";

const Profile = () => {
  const { logout } = useAuth();
  const navigate   = useNavigate();

  const [profile, setProfile]   = useState(null);
  const [form, setForm]         = useState({ name: "", email: "" });
  const [loading, setLoading]   = useState(true);
  const [saving, setSaving]     = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getUserProfile();
        const user = res.data?.data || res.data?.user || res.data;
        setProfile(user);
        setForm({ name: user.name || "", email: user.email || "" });
      } catch (err) {
        setError("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);
    try {
      const res = await updateUserProfile(form);
      const updated = res.data?.data || res.data?.user || res.data;
      setProfile(updated);
      setForm({ name: updated.name || "", email: updated.email || "" });
      setSuccess("Profile updated successfully!");
      setEditMode(false);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update profile.";
      setError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) return <Loader />;

  return (
    <div className="form-page">

      {/* Header */}
      <div className="form-page-header">
        <h1 className="form-page-title">My Profile</h1>
        <p className="form-page-subtitle">Manage your account details</p>
      </div>

      {/* Avatar Card */}
      <div className="form-card animate-fade-up" style={{ marginBottom: "1.5rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          padding: "0.5rem 0",
        }}>
          {/* Avatar */}
          <div style={{
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            background: "var(--accent-dim)",
            border: "2px solid var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono', monospace",
            fontSize: "1.4rem",
            fontWeight: "700",
            color: "var(--accent)",
            flexShrink: 0,
          }}>
            {getInitials(profile?.name)}
          </div>

          {/* Info */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "1.1rem",
              color: "var(--text-primary)",
              marginBottom: "0.25rem",
            }}>
              {profile?.name || "—"}
            </div>
            <div style={{
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "0.25rem",
            }}>
              {profile?.email || "—"}
            </div>
            <div style={{
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              Member since {profile?.createdAt
                ? new Date(profile.createdAt).toLocaleDateString("en-IN", {
                    month: "long", year: "numeric"
                  })
                : "—"}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="form-card animate-fade-up">
        <div className="card-header" style={{ padding: "1rem 1.5rem" }}>
          <h2 className="card-title">Account Details</h2>
          {!editMode && (
            <button
              className="btn-add"
              onClick={() => { setEditMode(true); setSuccess(""); setError(""); }}
            >
              ✎ Edit
            </button>
          )}
        </div>

        <div style={{ padding: "1.5rem" }}>
          {error   && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  className="form-input"
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  className="form-input"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setEditMode(false);
                    setError("");
                    setForm({ name: profile.name, email: profile.email });
                  }}
                >
                  Cancel
                </button>
                <button className="btn-primary" type="submit" disabled={saving}>
                  {saving ? <span className="loader-inline" /> : "Save Changes"}
                </button>
              </div>
            </form>
          ) : (
            /* Read-only view */
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div className="form-label" style={{ marginBottom: "0.3rem" }}>Full Name</div>
                <div style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.72rem 1rem",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}>
                  {profile?.name || "—"}
                </div>
              </div>
              <div>
                <div className="form-label" style={{ marginBottom: "0.3rem" }}>Email</div>
                <div style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  padding: "0.72rem 1rem",
                  color: "var(--text-primary)",
                  fontSize: "0.95rem",
                }}>
                  {profile?.email || "—"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Logout */}
      <div style={{ marginTop: "1.5rem" }}>
        <button className="btn-danger" style={{ width: "100%" }} onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>

    </div>
  );
};

export default Profile;
