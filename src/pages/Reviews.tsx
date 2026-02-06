import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Trash2, Loader2, Pencil, X, Youtube } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
const ADMIN_PHONE = '9587449072';

interface Review {
  _id: string;
  description: string;
  name: string;
  address: string;
  createdAt: string;
}

const Reviews = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Form state
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');

  // Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editDescription, setEditDescription] = useState('');
  const [editName, setEditName] = useState('');
  const [editAddress, setEditAddress] = useState('');
  const [updating, setUpdating] = useState(false);

  const isAdmin = user?.contactNumber === ADMIN_PHONE;

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reviews`);
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Submit review (Admin only)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return;

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify({ description, name, address }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to add review');
      }

      setSuccess('Review added successfully!');
      setDescription('');
      setName('');
      setAddress('');
      fetchReviews();
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  // Start editing a review
  const startEdit = (review: Review) => {
    setEditingId(review._id);
    setEditDescription(review.description);
    setEditName(review.name);
    setEditAddress(review.address);
  };

  // Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditDescription('');
    setEditName('');
    setEditAddress('');
  };

  // Update review (Admin only)
  const handleUpdate = async (id: string) => {
    if (!isAdmin) return;

    setUpdating(true);

    try {
      const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}`,
        },
        body: JSON.stringify({ 
          description: editDescription, 
          name: editName, 
          address: editAddress 
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to update review');
      }

      cancelEdit();
      fetchReviews();
    } catch (err: any) {
      alert(err.message || 'Failed to update review');
    } finally {
      setUpdating(false);
    }
  };

  // Delete review (Admin only)
  const handleDelete = async (id: string) => {
    if (!isAdmin || !confirm('Are you sure you want to delete this review?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/reviews/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user?.id}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to delete review');
      }

      fetchReviews();
    } catch (err: any) {
      alert(err.message || 'Failed to delete review');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container py-8">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {t('reviews.title')}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            {t('reviews.subtitle')}
          </p>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-2">
            {t('reviews.callToAction')} 
          </p>
          <a
            href="https://www.youtube.com/@vigatbahi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 font-bold text-2xl underline"
          >
            Vigat Bahi YouTube Channel 
          </a>
          <p className="text-primary font-medium max-w-2xl mx-auto">
            {t('reviews.feedbackThanks')}
          </p>
        </div>

        {/* Admin Form - Only visible to admin */}
        {isAdmin && (
          <Card className="mb-10 max-w-2xl mx-auto border-primary/20">
            <CardContent className="pt-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Quote className="h-5 w-5 text-primary" />
                Add New Review
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter the review description..."
                    rows={4}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Customer name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Address</label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Customer address (e.g., City, State)"
                    required
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive">{error}</p>
                )}
                {success && (
                  <p className="text-sm text-green-600">{success}</p>
                )}

                <Button type="submit" disabled={submitting} className="w-full">
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Adding Review...
                    </>
                  ) : (
                    'Add Review'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Reviews List */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <Quote className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No reviews yet.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <Card key={review._id} className="relative group hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {editingId === review._id ? (
                    // Edit Mode
                    <div className="space-y-3">
                      <Textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        placeholder="Description"
                        rows={3}
                        className="text-sm"
                      />
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Name"
                        className="text-sm"
                      />
                      <Input
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                        placeholder="Address"
                        className="text-sm"
                      />
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleUpdate(review._id)}
                          disabled={updating}
                          className="flex-1"
                        >
                          {updating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            'Save'
                          )}
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={cancelEdit}
                          className="flex-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      {/* Quote icon */}
                      <Quote className="h-8 w-8 text-primary/20 mb-3" />
                      
                      {/* Description */}
                      <p className="text-foreground mb-4 leading-relaxed">
                        "{review.description}"
                      </p>
                      
                      {/* Author info */}
                      <div className="border-t pt-4">
                        <p className="font-semibold text-foreground">— {review.name}</p>
                        <p className="text-sm text-muted-foreground">({review.address})</p>
                      </div>

                      {/* Edit & Delete buttons - Admin only */}
                      {isAdmin && (
                        <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => startEdit(review)}
                            className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
                            title="Edit review"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(review._id)}
                            className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20"
                            title="Delete review"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Reviews;
