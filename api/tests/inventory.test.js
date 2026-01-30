const Inventory = require('../inventory');

describe('Inventory Logic', () => {
    let inventory;

    beforeEach(() => {
        inventory = new Inventory();
    });

    test('should stock in correctly', () => {
        const qrData = '001&10/10/2025&2450616-T&80&MJ5121J4';
        const result = inventory.stockIn(qrData);

        expect(result.partNo).toBe('2450616-T');
        expect(result.qty).toBe(80);
        expect(inventory.getParts()[0].current).toBe(80);
    });

    test('should throw error on invalid QR format', () => {
        const qrData = 'invalid-data';
        expect(() => inventory.stockIn(qrData)).toThrow('Invalid QR Format');
    });

    test('should throw error on duplicate QR code', () => {
        const qrData = '001&10/10/2025&2450616-T&80&MJ5121J4';
        inventory.stockIn(qrData);
        expect(() => inventory.stockIn(qrData)).toThrow('Duplicate QR Code');
    });

    test('should toggle urgent status', () => {
        inventory.parts.push({ id: '1', partNo: 'P1', isUrgent: false });
        inventory.toggleUrgent('1');
        expect(inventory.parts[0].isUrgent).toBe(true);
        inventory.toggleUrgent('1');
        expect(inventory.parts[0].isUrgent).toBe(false);
    });
});
