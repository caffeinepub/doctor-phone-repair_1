# Specification

## Summary
**Goal:** Build a responsive public website for “Doctor Phone Repair” with service/pricing info, locations and contact details, plus an online appointment booking flow and an admin-only appointments viewer.

**Planned changes:**
- Create a mobile-first landing page with clear sections for Services & Pricing, Locations, and Contact using the provided prices (Rs), addresses, phone numbers, and Gmail.
- Add a consistent non-blue/purple visual theme across the site (typography, colors, spacing, buttons, forms).
- Implement a “Book Appointment” CTA and booking form (name, phone, preferred location, device model, issue type incl. the four services + Other, preferred date/time, optional notes) with English validation and success confirmation.
- Add backend canister persistence for appointment requests (create method returning an id; stored fields include createdAt, customer details, issue/service, preferred date/time, branch, notes, status).
- Add an admin-only backend API to list appointments restricted to an allowlist of admin principals (reject unauthorized callers).
- Add an admin frontend page that uses Internet Identity sign-in and displays a read-only list/table of appointments for authorized admins, with a clear not-authorized error for others.
- Add and render generated static brand assets (logo + hero illustration) from `frontend/public/assets/generated` with English alt text.

**User-visible outcome:** Visitors can view the shop’s services, pricing, locations, and contact links, submit an appointment request and receive confirmation; authorized admins can sign in with Internet Identity to view submitted appointments.
