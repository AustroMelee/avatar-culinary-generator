/**
 * Constants Module - Centralized Configuration and Pattern Definitions
 * 
 * This module provides all constants, patterns, and configuration values
 * used throughout the Avatar Food Generator system. Follows LLM-first
 * architecture principles by eliminating magic values.
 */

// Export all cleanup patterns for text processing
export * from './cleanup-patterns.js';

// Export all festival and ceremonial data
export * from './festivals.js';

/**
 * Module documentation available at: src/constants/README.md
 * 
 * Features:
 * - Pre-compiled regex patterns for 50-80% performance improvement
 * - Air Nomad festival calendar with cultural authenticity
 * - Centralized configuration to prevent magic values
 * - Ready for multi-nation expansion
 */ 