import Text "mo:core/Text";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Nat "mo:core/Nat";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type Appointment = {
    customerName : Text;
    deviceType : Text;
    issueDescription : Text;
    preferredDate : Text;
    status : Text;
  };

  public type UserProfile = {
    name : Text;
  };

  type AppointmentsMap = Map.Map<Principal, Appointments>;
  type Appointments = Map.Map<Text, Appointment>;

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let appointmentsByCustomer = Map.empty<Principal, Appointments>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var appointmentIdCounter : Nat = 0;

  func getCustomerAppointments(customerId : Principal) : Appointments {
    switch (appointmentsByCustomer.get(customerId)) {
      case (?customerAppointments) { customerAppointments };
      case (null) {
        let newAppointments = Map.empty<Text, Appointment>();
        appointmentsByCustomer.add(customerId, newAppointments);
        newAppointments;
      };
    };
  };

  func generateAppointmentId() : Text {
    appointmentIdCounter += 1;
    appointmentIdCounter.toText();
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Appointment Management
  public shared ({ caller }) func requestAppointment(
    customerName : Text,
    deviceType : Text,
    issueDescription : Text,
    preferredDate : Text,
  ) : async () {
    // Allow any caller including guests to request appointments
    // No authorization check needed - visitors can book appointments
    
    let appointment : Appointment = {
      customerName;
      deviceType;
      issueDescription;
      preferredDate;
      status = "Pending";
    };

    let customerAppointments = getCustomerAppointments(caller);
    let appointmentId = generateAppointmentId();
    customerAppointments.add(appointmentId, appointment);
  };

  public query ({ caller }) func getMyAppointments() : async [Appointment] {
    // Allow any caller including guests to view their own appointments
    // No authorization check needed - anyone can view their own data
    getCustomerAppointments(caller).values().toArray();
  };

  public query ({ caller }) func getAllAppointments() : async [(Principal, Text, Appointment)] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view all appointments");
    };

    appointmentsByCustomer.entries().flatMap(
      func((customer, customerAppointmentsMap)) {
        customerAppointmentsMap.entries().map(
          func((id, appointment)) { (customer, id, appointment) }
        );
      }
    ).toArray();
  };
};
