// Analysis Page Chart Initialization

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all charts
    initHabitabilityDistChart();
    initROCCurveChart();
    initAccuracyTimeChart();
    initPlanetTypesChart();
    initFeatureImportanceChart();
    initConfidenceChart();
    
    // Animate metric bars
    animateMetricBars();
    
    // Animate result cards
    animateResultCards();
});

// Habitability Score Distribution Chart
function initHabitabilityDistChart() {
    const ctx = document.getElementById('habitabilityDistChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-10%', '10-20%', '20-30%', '30-40%', '40-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
            datasets: [{
                label: 'Number of Planets',
                data: [423, 298, 156, 98, 67, 54, 43, 38, 36, 34],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(243, 156, 18, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(39, 174, 96, 0.8)',
                    'rgba(39, 174, 96, 0.8)'
                ],
                borderColor: 'rgba(64, 224, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// ROC Curve Chart
function initROCCurveChart() {
    const ctx = document.getElementById('rocCurveChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0.0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1.0'],
            datasets: [{
                label: 'ROC Curve (AUC = 0.943)',
                data: [0, 0.15, 0.35, 0.55, 0.70, 0.82, 0.90, 0.95, 0.98, 0.99, 1.0],
                borderColor: '#40E0FF',
                backgroundColor: 'rgba(64, 224, 255, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 3
            }, {
                label: 'Random Classifier',
                data: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
                borderColor: 'rgba(231, 76, 60, 0.5)',
                borderDash: [5, 5],
                fill: false,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'True Positive Rate',
                        color: '#ffffff'
                    },
                    min: 0,
                    max: 1,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'False Positive Rate',
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Accuracy Over Time Chart
function initAccuracyTimeChart() {
    const ctx = document.getElementById('accuracyTimeChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [{
                label: 'Training Accuracy',
                data: [72, 78, 82, 85, 87, 88.5, 89, 89.2],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }, {
                label: 'Validation Accuracy',
                data: [70, 76, 80, 83, 85, 86.5, 87.5, 88.1],
                borderColor: '#9b59b6',
                backgroundColor: 'rgba(155, 89, 182, 0.1)',
                fill: true,
                tension: 0.4,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Accuracy (%)',
                        color: '#ffffff'
                    },
                    min: 60,
                    max: 100,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Planet Types Distribution Chart
function initPlanetTypesChart() {
    const ctx = document.getElementById('planetTypesChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Gas Giants', 'Super-Earths', 'Terrestrial', 'Ice Giants', 'Mini-Neptunes'],
            datasets: [{
                data: [342, 456, 189, 123, 137],
                backgroundColor: [
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(230, 126, 34, 0.8)'
                ],
                borderColor: 'rgba(64, 224, 255, 0.5)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#ffffff',
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            }
        }
    });
}

// Feature Importance Chart
function initFeatureImportanceChart() {
    const ctx = document.getElementById('featureImportanceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: [
                'Distance from Star',
                'Planet Radius',
                'Surface Temperature',
                'Atmospheric Composition',
                'Stellar Type',
                'Orbital Period',
                'Planet Mass',
                'Eccentricity'
            ],
            datasets: [{
                label: 'Importance Score',
                data: [0.28, 0.22, 0.18, 0.15, 0.08, 0.05, 0.03, 0.01],
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(52, 152, 219, 0.75)',
                    'rgba(52, 152, 219, 0.7)',
                    'rgba(52, 152, 219, 0.65)',
                    'rgba(52, 152, 219, 0.6)',
                    'rgba(52, 152, 219, 0.55)',
                    'rgba(52, 152, 219, 0.5)',
                    'rgba(52, 152, 219, 0.45)'
                ],
                borderColor: '#40E0FF',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Importance Score',
                        color: '#ffffff'
                    },
                    min: 0,
                    max: 0.3,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Prediction Confidence Chart
function initConfidenceChart() {
    const ctx = document.getElementById('confidenceChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['0-50%', '50-60%', '60-70%', '70-80%', '80-90%', '90-100%'],
            datasets: [{
                label: 'Number of Predictions',
                data: [45, 89, 156, 298, 423, 236],
                backgroundColor: [
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(39, 174, 96, 0.8)'
                ],
                borderColor: 'rgba(64, 224, 255, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    labels: {
                        color: '#ffffff'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#40E0FF',
                    bodyColor: '#ffffff'
                }
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Count',
                        color: '#ffffff'
                    },
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Confidence Level',
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    ticks: {
                        color: '#ffffff'
                    }
                }
            }
        }
    });
}

// Animate metric bars
function animateMetricBars() {
    const metricBars = document.querySelectorAll('.metric-bar');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.transition = 'width 1.5s ease-out';
                    bar.style.width = width;
                }, 100);
                
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });
    
    metricBars.forEach(bar => observer.observe(bar));
}

// Animate result cards
function animateResultCards() {
    const resultCards = document.querySelectorAll('.result-card');
    
    resultCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease-out';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        }, index * 100);
    });
}
