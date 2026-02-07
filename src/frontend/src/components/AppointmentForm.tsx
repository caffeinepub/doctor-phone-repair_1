import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useRequestAppointment } from '@/hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

export default function AppointmentForm() {
  const navigate = useNavigate();
  const requestAppointment = useRequestAppointment();

  const [formData, setFormData] = useState({
    customerName: '',
    phone: '',
    location: '',
    deviceModel: '',
    issueType: '',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.location) {
      newErrors.location = 'Please select a location';
    }

    if (!formData.deviceModel.trim()) {
      newErrors.deviceModel = 'Device model is required';
    }

    if (!formData.issueType) {
      newErrors.issueType = 'Please select an issue type';
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = 'Preferred date is required';
    }

    if (!formData.preferredTime.trim()) {
      newErrors.preferredTime = 'Preferred time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      // Serialize all form data into the backend fields
      const deviceType = `${formData.deviceModel} | Phone: ${formData.phone}`;
      const issueDescription = `Issue: ${formData.issueType} | Location: ${formData.location} | Time: ${formData.preferredTime}${formData.notes ? ` | Notes: ${formData.notes}` : ''}`;
      
      await requestAppointment.mutateAsync({
        customerName: formData.customerName,
        deviceType,
        issueDescription,
        preferredDate: formData.preferredDate,
      });

      navigate({ to: '/booking-success' });
    } catch (error) {
      console.error('Failed to submit appointment:', error);
      setErrors({ submit: 'Failed to submit appointment. Please try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="customerName">
          Full Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="customerName"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          placeholder="Enter your full name"
          className={errors.customerName ? 'border-destructive' : ''}
        />
        {errors.customerName && (
          <p className="text-sm text-destructive">{errors.customerName}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">
          Phone Number <span className="text-destructive">*</span>
        </Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          placeholder="+91 XXXXX XXXXX"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">
          Preferred Location <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
          <SelectTrigger className={errors.location ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Main Office - 2nd floor TDA COMPLEX Tinsukia Assam">
              Main Office - TDA COMPLEX
            </SelectItem>
            <SelectItem value="Sub branch - Rupai siding Tinsukia Assam">
              Sub Branch - Rupai siding
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.location && <p className="text-sm text-destructive">{errors.location}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="deviceModel">
          Device Model <span className="text-destructive">*</span>
        </Label>
        <Input
          id="deviceModel"
          value={formData.deviceModel}
          onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
          placeholder="e.g., iPhone 13, Samsung Galaxy S21"
          className={errors.deviceModel ? 'border-destructive' : ''}
        />
        {errors.deviceModel && (
          <p className="text-sm text-destructive">{errors.deviceModel}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="issueType">
          Issue Type <span className="text-destructive">*</span>
        </Label>
        <Select value={formData.issueType} onValueChange={(value) => setFormData({ ...formData, issueType: value })}>
          <SelectTrigger className={errors.issueType ? 'border-destructive' : ''}>
            <SelectValue placeholder="Select issue type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Screen Replacement">Screen Replacement</SelectItem>
            <SelectItem value="Battery Replacement">Battery Replacement</SelectItem>
            <SelectItem value="Water Damage Repair">Water Damage Repair</SelectItem>
            <SelectItem value="Dead Phone Repair">Dead Phone Repair</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.issueType && <p className="text-sm text-destructive">{errors.issueType}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="preferredDate">
            Preferred Date <span className="text-destructive">*</span>
          </Label>
          <Input
            id="preferredDate"
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className={errors.preferredDate ? 'border-destructive' : ''}
          />
          {errors.preferredDate && (
            <p className="text-sm text-destructive">{errors.preferredDate}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="preferredTime">
            Preferred Time <span className="text-destructive">*</span>
          </Label>
          <Input
            id="preferredTime"
            type="time"
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            className={errors.preferredTime ? 'border-destructive' : ''}
          />
          {errors.preferredTime && (
            <p className="text-sm text-destructive">{errors.preferredTime}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Additional Notes (Optional)</Label>
        <Textarea
          id="notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Any additional information about the issue..."
          rows={4}
        />
      </div>

      {errors.submit && (
        <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive">
          {errors.submit}
        </div>
      )}

      <Button type="submit" className="w-full" size="lg" disabled={requestAppointment.isPending}>
        {requestAppointment.isPending ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Appointment Request'
        )}
      </Button>
    </form>
  );
}

