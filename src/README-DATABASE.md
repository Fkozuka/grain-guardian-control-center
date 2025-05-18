
# SQLite Database Integration Guide

This document provides instructions for developing the SQLite database for the AgroFlow application.

## Database Structure

The SQLite database consists of the following tables:

### Equipment Tables
- `equipment`: Stores basic information about equipment
- `equipment_details`: Stores detailed status information for equipment

### Monitoring Data Tables
- `tons_per_hour`: Records tons per hour data for each equipment
- `reception_progress`: Tracks reception progress throughout the day
- `failure_data`: Records equipment failures by type
- `availability_data`: Tracks equipment availability over time
- `operation_time_data`: Records operation time by shift for equipment

### Dryer Tables
- `dryer_data`: Stores current dryer status information
- `historical_dryer_data`: Records historical dryer data over time

### Storage Tables
- `silo_storage`: Stores silo status and level information

## Development Instructions

### 1. Setup the Database

The database is automatically initialized when the application starts. The code in `src/db/database.ts` creates the SQLite database file and sets up all required tables.

### 2. Data Seeding

Initial data is seeded into the database using the `seedDatabase` function in `src/db/seedData.ts`. This provides baseline data for the application.

### 3. Database Queries

All database queries are located in `src/db/queries.ts`. These functions provide an interface to interact with the database.

### 4. API Layer

The `src/api/index.ts` file provides an API layer that serves as the interface between the UI and the database.

## Working with Real Data

To replace the mock data with real data from sensors and other systems:

1. Create an API endpoint (e.g., `/api/equipment-status`) that receives data from your sensors
2. Update the database with the received data using appropriate SQL queries
3. The UI will fetch the updated data through the existing API layer

## Database Schema

Here's a description of the key fields in each table:

### equipment
- `id`: Unique identifier
- `name`: Equipment name
- `type`: Type of equipment (elevator, chain, screw)
- `status`: Current status (running, warning, error, inactive)
- `current_ampere`: Current electrical consumption

### equipment_details
- `equipment_id`: Foreign key to equipment table
- Various boolean fields for different status indicators

### tons_per_hour
- `equipment_name`: Name of the equipment
- `value`: Tons per hour value
- `timestamp`: When the measurement was taken

### silo_storage
- `silo_id`: Unique identifier for the silo
- `capacity`: Total capacity in tons
- `current_level`: Current storage level in tons
- `product`: Product being stored
- `temperature`: Current temperature
- `humidity`: Current humidity level

## Integration with External Systems

To integrate with external systems like PLCs, SCADA, or other control systems:

1. Create a middleware service that can communicate with both your external systems and the SQLite database
2. Configure your middleware to:
   - Poll data from external systems
   - Transform data to match the database schema
   - Insert/update the SQLite database
   - Trigger notifications if necessary

## Backup and Maintenance

Regular database maintenance tasks:

1. Backup the database file (`agroflow.db`) regularly
2. Consider pruning historical data older than a certain date
3. Implement database optimization routines if the database grows large

## Performance Considerations

For optimal performance:

1. Create appropriate indexes on frequently queried columns
2. Consider using transactions for batch updates
3. If the database becomes too large, implement data archiving strategies
