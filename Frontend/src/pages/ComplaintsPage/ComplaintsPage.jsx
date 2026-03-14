import React, { useState } from 'react';
import { ChevronLeft, AlertTriangle, User, Truck, MessageSquare, FileText, Send, Clock, CheckCircle, XCircle, Camera, MapPin, Plus } from 'lucide-react';

const ComplaintsPage = ({ onBack }) => {
  const [complaints, setComplaints] = useState([]);
  
  const [formData, setFormData] = useState({
    type: 'traffic',
    description: '',
    location: '',
    photo: null
  });
  const [submitting, setSubmitting] = useState(false);

  const complaintTypes = [
    { value: 'traffic', label: 'Traffic Violation', icon: AlertTriangle },
    { value: 'passenger', label: 'Passenger Issue', icon: User },
    { value: 'vehicle', label: 'Vehicle Problem', icon: Truck },
    { value: 'other', label: 'Other', icon: MessageSquare }
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    'in-progress': 'bg-blue-100 text-blue-800 border-blue-300',
    resolved: 'bg-green-100 text-green-800 border-green-300',
    rejected: 'bg-red-100 text-red-800 border-red-300'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setFormData({ ...formData, photo: e.dataTransfer.files[0] });
  };

  const submitComplaint = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const newComplaint = {
        id: Date.now(),
        type: formData.type,
        description: formData.description,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        location: formData.location
      };
      setComplaints([newComplaint, ...complaints]);
      setFormData({ type: 'traffic', description: '', location: '', photo: null });
      setSubmitting(false);
      // Simulate API call
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-200 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={onBack}
            className="p-3 bg-white shadow-lg rounded-2xl hover:shadow-xl transition-all flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              File a Complaint
            </h1>
            <p className="text-neutral-600 mt-2">Report violations, passenger issues, or vehicle problems</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Submit New Complaint Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Plus className="w-8 h-8 text-blue-500" />
              New Complaint
            </h2>

            <form onSubmit={submitComplaint} className="space-y-6">
              {/* Type Select */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">Complaint Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {complaintTypes.map(({ value, label, icon: Icon }) => (
                    <label key={value} className="flex items-center p-4 border-2 border-neutral-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
                      <Icon className="w-6 h-6 mr-3 text-neutral-500" />
                      <input
                        type="radio"
                        name="type"
                        value={value}
                        checked={formData.type === value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="font-medium">{label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-neutral-700 mb-3">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe the issue in detail..."
                  className="w-full p-4 border border-neutral-200 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-300 resize-vertical min-h-[120px] shadow-sm"
                  required
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Red Zone Market"
                      className="w-full pl-12 pr-4 py-3 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-blue-200 focus:border-blue-300 shadow-sm"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-neutral-700 mb-2">Attach Photo</label>
                  <div 
                    className="border-2 border-dashed border-neutral-300 rounded-2xl p-8 text-center hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer h-32 flex flex-col items-center justify-center"
                    onDrop={handleFileDrop}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {formData.photo ? (
                      <img src={URL.createObjectURL(formData.photo)} alt="Preview" className="w-16 h-16 object-cover rounded-lg mx-auto mb-2" />
                    ) : (
                      <Camera className="w-12 h-12 text-neutral-400 mb-2 mx-auto" />
                    )}
                    <p className="text-sm text-neutral-600">{formData.photo ? formData.photo.name : 'Drop photo or click'}</p>
                    <input type="file" onChange={handlePhotoChange} className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={submitting || !formData.description || !formData.location}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-2xl font-bold text-lg shadow-xl hover:from-orange-600 hover:to-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
              >
                {submitting ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    Submit Complaint
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Complaints History */}
          <div className="bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-indigo-500" />
              My Complaints ({complaints.length})
            </h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {complaints.map((complaint) => (
                <div key={complaint.id} className="border border-neutral-200 rounded-2xl p-6 hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {complaintTypes.find(t => t.value === complaint.type)?.icon ? 
                        React.createElement(complaintTypes.find(t => t.value === complaint.type).icon, { className: 'w-8 h-8 text-blue-500' }) 
                        : <AlertTriangle className="w-8 h-8 text-blue-500" />
                      }
                      <div>
                        <h4 className="font-bold text-lg capitalize">{complaint.type}</h4>
                        <p className="text-neutral-600 text-sm">{complaint.location} • {complaint.date}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[complaint.status]}`}>
                      {complaint.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-neutral-700 leading-relaxed">{complaint.description}</p>
                </div>
              ))}
              {complaints.length === 0 && (
                <div className="text-center py-12 text-neutral-500">
                  <FileText className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>No complaints yet. Use the form to report your first issue.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsPage;

