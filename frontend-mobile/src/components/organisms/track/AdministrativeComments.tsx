import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MessageSquare } from 'lucide-react-native';

interface AdministrativeCommentsProps {
  comments?: string;
}

export default function AdministrativeComments({ comments }: AdministrativeCommentsProps) {
  if (!comments) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.headerIconWrapper}>
          <MessageSquare size={15} color="#0B2D63" />
        </View>
        <Text style={styles.headerTitle}>Administrative Comments</Text>
      </View>

      <View style={styles.commentBox}>
        <Text style={styles.commentText}>{comments}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    padding: 24,
    elevation: 1,
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  headerIconWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#EEF2FA',
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  commentBox: {
    backgroundColor: '#f8fafc', 
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  commentText: {
    fontSize: 14,
    color: '#334155', 
    lineHeight: 20, 
  },
});