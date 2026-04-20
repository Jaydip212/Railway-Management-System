const RailStorage = {
    KEYS: {
        TRAINS: 'railjet_trains',
        BOOKINGS: 'railjet_bookings',
        USERS: 'railjet_users',
        STATIONS: 'railjet_stations'
    },

    init() {
        if (!localStorage.getItem(this.KEYS.TRAINS)) {
            const initialTrains = [
                { id: 'T001', name: 'Rajdhani Express', from: 'Mumbai', to: 'Delhi', departure: '16:00', arrival: '08:30', price: 2400, seats: { total: 100, available: 45 }, days: ['Mon', 'Wed', 'Fri'] },
                { id: 'T002', name: 'Shatabdi Express', from: 'Pune', to: 'Ahmedabad', departure: '07:15', arrival: '15:20', price: 1200, seats: { total: 80, available: 12 }, days: ['Daily'] },
                { id: 'T003', name: 'Duronto Express', from: 'Kolkata', to: 'Bangalore', departure: '20:30', arrival: '05:00', price: 3100, seats: { total: 120, available: 88 }, days: ['Tue', 'Thu', 'Sat'] },
                { id: 'T004', name: 'Humsafar Express', from: 'Chennai', to: 'Mumbai', departure: '11:45', arrival: '10:15', price: 1850, seats: { total: 150, available: 5 }, days: ['Mon', 'Fri'] },
                { id: 'T005', name: 'Gatiman Express', from: 'Delhi', to: 'Agra', departure: '08:10', arrival: '09:50', price: 850, seats: { total: 60, available: 42 }, days: ['Daily'] }
            ];
            localStorage.setItem(this.KEYS.TRAINS, JSON.stringify(initialTrains));
        }

        if (!localStorage.getItem(this.KEYS.STATIONS)) {
            const initialStations = ['Mumbai', 'Delhi', 'Pune', 'Ahmedabad', 'Kolkata', 'Bangalore', 'Chennai', 'Agra', 'Hyderabad', 'Lucknow'];
            localStorage.setItem(this.KEYS.STATIONS, JSON.stringify(initialStations));
        }

        if (!localStorage.getItem(this.KEYS.BOOKINGS)) {
            localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify([]));
        }
    },

    // Train Methods
    getTrains() {
        return JSON.parse(localStorage.getItem(this.KEYS.TRAINS)) || [];
    },

    saveTrain(train) {
        const trains = this.getTrains();
        const index = trains.findIndex(t => t.id === train.id);
        if (index > -1) trains[index] = train;
        else trains.push(train);
        localStorage.setItem(this.KEYS.TRAINS, JSON.stringify(trains));
    },

    deleteTrain(trainId) {
        let trains = this.getTrains();
        trains = trains.filter(t => t.id !== trainId);
        localStorage.setItem(this.KEYS.TRAINS, JSON.stringify(trains));
    },

    // Booking Methods
    getBookings() {
        return JSON.parse(localStorage.getItem(this.KEYS.BOOKINGS)) || [];
    },

    addBooking(booking) {
        const bookings = this.getBookings();
        const pnr = 'RJ' + Math.floor(10000000 + Math.random() * 90000000);
        const newBooking = { ...booking, pnr, status: 'Confirmed', date: new Date().toLocaleDateString() };
        bookings.unshift(newBooking);
        localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
        
        // Update Train Seats
        this.updateTrainSeats(booking.trainId, -1);
        
        return newBooking;
    },

    updateTrainSeats(trainId, delta) {
        const trains = this.getTrains();
        const index = trains.findIndex(t => t.id === trainId);
        if (index > -1) {
            trains[index].seats.available += delta;
            localStorage.setItem(this.KEYS.TRAINS, JSON.stringify(trains));
        }
    },

    cancelBooking(pnr) {
        const bookings = this.getBookings();
        const index = bookings.findIndex(b => b.pnr === pnr);
        if (index > -1) {
            const trainId = bookings[index].trainId;
            bookings[index].status = 'Cancelled';
            localStorage.setItem(this.KEYS.BOOKINGS, JSON.stringify(bookings));
            this.updateTrainSeats(trainId, 1);
            return true;
        }
        return false;
    },

    // Station Methods
    getStations() {
        return JSON.parse(localStorage.getItem(this.KEYS.STATIONS)) || [];
    }
};

// Auto Init
RailStorage.init();
