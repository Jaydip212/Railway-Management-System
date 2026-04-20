document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            this.cacheDOM();
            this.bindEvents();
            this.renderView('dashboard');
        },

        cacheDOM() {
            this.navItems = document.querySelectorAll('.sidebar-nav li');
            this.contentView = document.getElementById('contentView');
            this.pageTitle = document.getElementById('pageTitle');
            this.pageSubtitle = document.getElementById('pageSubtitle');
            this.modalContainer = document.getElementById('modalContainer');
            this.modalBody = document.getElementById('modalBody');
            this.closeModalBtn = document.querySelector('.close-modal');
        },

        bindEvents() {
            this.navItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.navItems.forEach(i => i.classList.remove('active'));
                    item.classList.add('active');
                    this.renderView(item.dataset.page);
                });
            });

            this.closeModalBtn.addEventListener('click', () => {
                this.modalContainer.classList.add('hidden');
            });

            document.getElementById('quickBookBtn').addEventListener('click', () => {
                this.renderView('search');
                this.navItems.forEach(i => i.classList.remove('active'));
                document.getElementById('navSearch').classList.add('active');
            });
        },

        renderView(viewName) {
            this.contentView.innerHTML = '<div class="loader-container"><div class="loader"></div></div>';
            
            setTimeout(() => {
                switch(viewName) {
                    case 'dashboard': this.viewDashboard(); break;
                    case 'search': this.viewSearch(); break;
                    case 'bookings': this.viewBookings(); break;
                    case 'pnr-status': this.viewPnrStatus(); break;
                    case 'admin': this.viewAdmin(); break;
                    default: this.viewDashboard();
                }
            }, 300);
        },

        // --- DASHBOARD VIEW ---
        viewDashboard() {
            this.pageTitle.innerText = "Dashboard";
            this.pageSubtitle.innerText = "Welcome back to your control center.";
            
            const bookings = RailStorage.getBookings();
            const trains = RailStorage.getTrains();
            const confirmedCount = bookings.filter(b => b.status === 'Confirmed').length;
            
            this.contentView.innerHTML = `
                <div class="stats-grid">
                    <div class="glass-card">
                        <div class="stat-icon" style="background: rgba(0, 136, 255, 0.1); color: var(--accent-primary)">
                            <i class="fas fa-train"></i>
                        </div>
                        <div class="stat-value">${trains.length}</div>
                        <div class="stat-label">Active Trains</div>
                    </div>
                    <div class="glass-card">
                        <div class="stat-icon" style="background: rgba(16, 185, 129, 0.1); color: var(--success)">
                            <i class="fas fa-ticket-alt"></i>
                        </div>
                        <div class="stat-value">${confirmedCount}</div>
                        <div class="stat-label">Total Bookings</div>
                    </div>
                    <div class="glass-card">
                        <div class="stat-icon" style="background: rgba(245, 158, 11, 0.1); color: var(--warning)">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="stat-value">${bookings.length > 0 ? '1' : '0'}</div>
                        <div class="stat-label">Upcoming Trips</div>
                    </div>
                </div>

                <div class="glass-card">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
                        <h3 style="font-family: 'Outfit'">Recent Bookings</h3>
                        <button class="icon-btn" onclick="location.reload()"><i class="fas fa-redo"></i></button>
                    </div>
                    <div class="data-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>PNR</th>
                                    <th>Train</th>
                                    <th>Route</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bookings.length ? bookings.slice(0, 5).map(b => `
                                    <tr>
                                        <td style="font-weight: 700; color: var(--accent-secondary)">#${b.pnr}</td>
                                        <td>${b.trainName}</td>
                                        <td>${b.from} → ${b.to}</td>
                                        <td>${b.date}</td>
                                        <td><span class="${b.status === 'Confirmed' ? 'text-success' : 'text-error'}">${b.status}</span></td>
                                    </tr>
                                `).join('') : '<tr><td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary)">No recent bookings found.</td></tr>'}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        // --- SEARCH VIEW ---
        viewSearch() {
            this.pageTitle.innerText = "Search & Book";
            this.pageSubtitle.innerText = "Find the best trains for your next destination.";
            
            const stations = RailStorage.getStations();
            
            this.contentView.innerHTML = `
                <div class="glass-card" style="margin-bottom: 30px;">
                    <form id="searchForm" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px;">
                        <div class="input-group">
                            <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">From</label>
                            <select id="searchFrom" class="glass-card" style="width: 100%; border: 1px solid var(--glass-border); color: #fff; padding: 10px;">
                                <option value="">Select Origin</option>
                                ${stations.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group">
                            <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">To</label>
                            <select id="searchTo" class="glass-card" style="width: 100%; border: 1px solid var(--glass-border); color: #fff; padding: 10px;">
                                <option value="">Select Destination</option>
                                ${stations.map(s => `<option value="${s}">${s}</option>`).join('')}
                            </select>
                        </div>
                        <div class="input-group">
                            <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">Travel Date</label>
                            <input type="date" class="glass-card" style="width: 100%; border: 1px solid var(--glass-border); color: #fff; padding: 10px;">
                        </div>
                        <div class="input-group" style="display: flex; align-items: flex-end;">
                            <button type="submit" class="primary-btn" style="width: 100%; justify-content: center;">
                                <i class="fas fa-search"></i> Find Trains
                            </button>
                        </div>
                    </form>
                </div>

                <div id="searchResults" class="results-container">
                    <div style="text-align: center; padding: 60px; color: var(--text-secondary);">
                        <i class="fas fa-train" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.2;"></i>
                        <p>Search for trains to see results.</p>
                    </div>
                </div>
            `;

            document.getElementById('searchForm').addEventListener('submit', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        },

        performSearch() {
            const from = document.getElementById('searchFrom').value;
            const to = document.getElementById('searchTo').value;
            const resultsDiv = document.getElementById('searchResults');
            
            if (!from || !to) {
                alert("Please select both source and destination.");
                return;
            }

            const trains = RailStorage.getTrains().filter(t => 
                (t.from === from && t.to === to) || (t.from === to && t.to === from)
            );

            if (trains.length === 0) {
                resultsDiv.innerHTML = `<div class="glass-card" style="text-align: center; padding: 40px; color: var(--text-secondary);">No trains found for this route. Try Mumbai → Delhi for demo.</div>`;
                return;
            }

            resultsDiv.innerHTML = trains.map(t => `
                <div class="glass-card" style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; border-left: 4px solid var(--accent-primary);">
                    <div class="train-info">
                        <h3 style="font-family: 'Outfit'; margin-bottom: 5px;">${t.name} (${t.id})</h3>
                        <p style="font-size: 0.85rem; color: var(--text-secondary)">
                            <i class="fas fa-calendar-alt"></i> ${t.days.join(', ')}
                        </p>
                    </div>
                    <div class="route-info" style="display: flex; align-items: center; gap: 20px;">
                        <div style="text-align: center;">
                            <span style="font-size: 1.1rem; font-weight: 700;">${t.departure}</span>
                            <span style="display: block; font-size: 0.7rem; color: var(--text-secondary)">${t.from}</span>
                        </div>
                        <div style="color: var(--glass-border)">──── <i class="fas fa-train"></i> ────</div>
                        <div style="text-align: center;">
                            <span style="font-size: 1.1rem; font-weight: 700;">${t.arrival}</span>
                            <span style="display: block; font-size: 0.7rem; color: var(--text-secondary)">${t.to}</span>
                        </div>
                    </div>
                    <div class="price-info" style="text-align: right;">
                        <div style="font-size: 1.3rem; font-weight: 700; color: var(--accent-secondary); margin-bottom: 10px;">₹${t.price}</div>
                        <button class="primary-btn" onclick="window.App.bookTicket('${t.id}')">Book Now</button>
                    </div>
                </div>
            `).join('');
        },

        // --- BOOKING LOGIC ---
        bookTicket(trainId) {
            const trains = RailStorage.getTrains();
            const train = trains.find(t => t.id === trainId);
            
            this.modalContainer.classList.remove('hidden');
            this.modalBody.innerHTML = `
                <h2 style="font-family: 'Outfit'; margin-bottom: 20px;">Finalize Booking</h2>
                <div class="glass-card" style="margin-bottom: 20px;">
                    <p style="margin-bottom: 10px;">Train: <strong>${train.name}</strong></p>
                    <p style="margin-bottom: 10px;">Route: <strong>${train.from} → ${train.to}</strong></p>
                    <p>Total Charge: <strong style="color: var(--accent-secondary)">₹${train.price}</strong></p>
                </div>
                <form id="bookingForm">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Passenger Name</label>
                        <input type="text" id="passengerName" class="glass-card" style="width: 100%; color: #fff; padding: 10px;" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Travel Date</label>
                        <input type="date" id="travelDate" class="glass-card" style="width: 100%; border: 1px solid var(--glass-border); color: #fff; padding: 10px;" required>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 0.8rem; margin-bottom: 5px;">Seat Class</label>
                        <select id="seatClass" class="glass-card" style="width: 100%; color: #fff; padding: 10px;">
                            <option value="Sleeper">Sleeper (SL)</option>
                            <option value="3A">AC 3 Tier (3A)</option>
                            <option value="2A">AC 2 Tier (2A)</option>
                            <option value="1A">AC First Class (1A)</option>
                        </select>
                    </div>
                    <button type="submit" class="primary-btn" style="width: 100%; justify-content: center; margin-top: 20px;">
                        Confirm Booking
                    </button>
                </form>
            `;

            document.getElementById('bookingForm').addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('passengerName').value.trim();
                const sCls = document.getElementById('seatClass').value;
                const date = document.getElementById('travelDate').value;

                if (!name || !sCls || !date) {
                    alert('Please fill all fields');
                    return;
                }
                
                const booking = RailStorage.addBooking({
                    trainId: train.id,
                    trainName: train.name,
                    from: train.from,
                    to: train.to,
                    passengerName: name,
                    seatClass: sCls,
                    price: train.price,
                    date: date
                });

                this.modalBody.innerHTML = `
                    <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(16, 185, 129, 0.05)); padding: 30px; border-radius: 20px; border: 1px solid rgba(16, 185, 129, 0.3); text-align: center; position: relative; overflow: hidden;">
                        <div style="position: absolute; top: -50px; right: -50px; opacity: 0.05;">
                            <i class="fas fa-ticket-alt" style="font-size: 15rem;"></i>
                        </div>
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--success); margin-bottom: 20px; filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.4));"></i>
                        <h2 style="font-family: 'Outfit'; margin-bottom: 10px; color: #fff;">E-Ticket Confirmed!</h2>
                        
                        <div class="glass-card" style="margin: 20px 0; text-align: left; background: rgba(0,0,0,0.4);">
                            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed var(--glass-border); padding-bottom: 15px; margin-bottom: 15px;">
                                <div>
                                    <span style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px;">PNR Number</span>
                                    <div style="font-size: 1.4rem; font-weight: 700; color: var(--accent-secondary); font-family: 'Outfit';">#${booking.pnr}</div>
                                </div>
                                <div style="text-align: right;">
                                    <i class="fas fa-qrcode" style="font-size: 2.5rem; color: var(--text-secondary);"></i>
                                </div>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                                <div>
                                    <span style="display: block; font-size: 0.7rem; color: var(--text-secondary);">Passenger</span>
                                    <span style="font-weight: 600;">${booking.passengerName}</span>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.7rem; color: var(--text-secondary);">Train</span>
                                    <span style="font-weight: 600;">${booking.trainName}</span>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.7rem; color: var(--text-secondary);">Route</span>
                                    <span style="font-weight: 600;">${booking.from} <i class="fas fa-arrow-right" style="font-size: 0.7rem; color: var(--accent-primary);"></i> ${booking.to}</span>
                                </div>
                                <div>
                                    <span style="display: block; font-size: 0.7rem; color: var(--text-secondary);">Class & Date</span>
                                    <span style="font-weight: 600;">${booking.seatClass} | ${booking.date}</span>
                                </div>
                            </div>
                        </div>
                        
                        <button class="primary-btn" style="margin: 0 auto; min-width: 200px; justify-content: center;" onclick="window.App.renderView('bookings'); document.getElementById('modalContainer').classList.add('hidden');">
                            View My Tickets
                        </button>
                    </div>
                `;
            });
        },

        // --- BOOKINGS VIEW ---
        viewBookings() {
            this.pageTitle.innerText = "My Bookings";
            this.pageSubtitle.innerText = "Manage your tickets and travel history.";
            
            const bookings = RailStorage.getBookings();
            
            this.contentView.innerHTML = `
                <div class="data-table-container">
                    <table>
                        <thead>
                            <tr>
                                <th>PNR</th>
                                <th>Train</th>
                                <th>Passenger</th>
                                <th>Route</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bookings.length ? bookings.map(b => `
                                <tr>
                                    <td style="font-weight: 700; color: var(--accent-secondary)">#${b.pnr}</td>
                                    <td>${b.trainName}</td>
                                    <td>${b.passengerName}</td>
                                    <td>${b.from} → ${b.to}</td>
                                    <td><span class="${b.status === 'Confirmed' ? 'text-success' : 'text-error'}">${b.status}</span></td>
                                    <td>
                                        ${b.status === 'Confirmed' ? `<button class="icon-btn text-error" onclick="window.App.cancelBooking('${b.pnr}')" title="Cancel"><i class="fas fa-trash-alt"></i></button>` : '-'}
                                    </td>
                                </tr>
                            `).join('') : '<tr><td colspan="6" style="text-align: center; padding: 40px; color: var(--text-secondary)">No bookings found.</td></tr>'}
                        </tbody>
                    </table>
                </div>
            `;
        },

        cancelBooking(pnr) {
            if (confirm(`Are you sure you want to cancel booking #${pnr}?`)) {
                RailStorage.cancelBooking(pnr);
                this.viewBookings();
            }
        },

        // --- PNR STATUS VIEW ---
        viewPnrStatus() {
            this.pageTitle.innerText = "PNR Status";
            this.pageSubtitle.innerText = "Instantly check your ticket status.";
            
            this.contentView.innerHTML = `
                <div class="glass-card" style="max-width: 500px; margin: 0 auto; text-align: center;">
                    <i class="fas fa-search" style="font-size: 2.5rem; color: var(--accent-primary); margin-bottom: 20px;"></i>
                    <h3 style="margin-bottom: 10px;">Check PNR Status</h3>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 24px;">Enter your 10-digit PNR number below.</p>
                    <div style="display: flex; gap: 10px;">
                        <input type="text" id="pnrInput" class="glass-card" placeholder="Example: RJ847392" style="flex: 1; color: #fff; padding: 12px;">
                        <button class="primary-btn" onclick="window.App.checkPnr()">Check</button>
                    </div>
                </div>
                <div id="pnrResult" style="margin-top: 30px;"></div>
            `;
        },

        checkPnr() {
            const pnr = document.getElementById('pnrInput').value.trim();
            const resultDiv = document.getElementById('pnrResult');
            const bookings = RailStorage.getBookings();
            const booking = bookings.find(b => b.pnr === pnr || ('#' + b.pnr) === pnr);

            if (!booking) {
                resultDiv.innerHTML = `<div class="glass-card text-error" style="max-width: 500px; margin: 0 auto; text-align: center;">Invalid PNR number or booking not found.</div>`;
                return;
            }

            resultDiv.innerHTML = `
                <div class="glass-card" style="max-width: 500px; margin: 0 auto; border-top: 4px solid ${booking.status === 'Confirmed' ? 'var(--success)' : 'var(--error)'}">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                        <span style="color: var(--text-secondary)">PNR Status for #${booking.pnr}</span>
                        <span class="${booking.status === 'Confirmed' ? 'text-success' : 'text-error'}">${booking.status}</span>
                    </div>
                    <div style="margin-bottom: 15px;">
                        <h3 style="font-family: 'Outfit'">${booking.trainName}</h3>
                        <p style="font-size: 0.85rem; color: var(--text-secondary)">Passenger: ${booking.passengerName}</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.02); padding: 15px; border-radius: 10px;">
                        <div style="display:flex; justify-content: space-between; font-size: 0.9rem;">
                            <span>Class: ${booking.seatClass}</span>
                            <span>Date: ${booking.date}</span>
                        </div>
                    </div>
                </div>
            `;
        },

        // --- ADMIN VIEW ---
        viewAdmin() {
            this.pageTitle.innerText = "Admin Portal";
            this.pageSubtitle.innerText = "Manage trains and schedules.";
            
            const trains = RailStorage.getTrains();
            
            this.contentView.innerHTML = `
                <div class="glass-card" style="margin-bottom: 30px;">
                    <h3 style="margin-bottom: 20px;">Manage Trains</h3>
                    <div class="data-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Seats</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${trains.map(t => `
                                    <tr>
                                        <td>${t.id}</td>
                                        <td>${t.name}</td>
                                        <td>${t.from}</td>
                                        <td>${t.to}</td>
                                        <td>${t.seats.available}/${t.seats.total}</td>
                                        <td>
                                            <button class="icon-btn text-error" onclick="window.App.deleteTrain('${t.id}')"><i class="fas fa-trash-alt"></i></button>
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        },

        deleteTrain(id) {
            if (confirm("Are you sure you want to remove this train?")) {
                RailStorage.deleteTrain(id);
                this.viewAdmin();
            }
        }
    };

    window.App = App;
    App.init();
});
