import React, { useState, useEffect, useRef } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { aiApi } from '../services/api/endpoints';
import { colors } from '../theme/colors';

interface ChatMessage {
  role: 'user' | 'model' | 'function';
  content: string;
  name?: string;
}

interface AiBotModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AiBotModal: React.FC<AiBotModalProps> = ({ visible, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (visible && messages.length === 0) {
      loadHistory();
    }
  }, [visible]);

  const loadHistory = async () => {
    try {
      setIsLoading(true);
      const res = await aiApi.getHistory();
      if (res.success && res.messages) {
        setMessages(res.messages);
      }
    } catch (e) {
      console.error("Failed to load history", e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    setMessages([]);
    try {
      await aiApi.clearHistory();
    } catch (e) {
      console.error("Failed to clear history", e);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);

    const newHistory: ChatMessage[] = [...messages, { role: 'user', content: userMsg }];
    setMessages(newHistory);

    try {
      const result = await aiApi.chat(userMsg, messages);

      if (result.success && result.updatedHistory) {
        setMessages(result.updatedHistory);
      } else {
        setMessages([
          ...newHistory, 
          { role: 'model', content: `Error: ${result.error || 'Failed to communicate with AI'}` }
        ]);
      }
    } catch (error: any) {
      setMessages([
        ...newHistory,
        { role: 'model', content: `Error: ${error.message}` }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = ({ item }: { item: ChatMessage }) => {
    if (item.role === 'function') {
      return (
        <View style={styles.actionContainer}>
          <View style={styles.actionBadge}>
            <MaterialIcons name="settings" size={14} color={colors.textMuted} />
            <Text style={styles.actionText}>Action Completed</Text>
          </View>
        </View>
      );
    }
    
    if (item.role === 'model' && item.name) {
      return (
        <View style={styles.actionContainer}>
          <View style={styles.executingBadge}>
            <ActivityIndicator size="small" color="#818cf8" />
            <Text style={styles.executingText}>Executing {item.name}...</Text>
          </View>
        </View>
      );
    }

    const isUser = item.role === 'user';

    return (
      <View style={[styles.messageWrapper, isUser ? styles.messageWrapperUser : styles.messageWrapperModel]}>
        <View style={[styles.messageBubble, isUser ? styles.messageBubbleUser : styles.messageBubbleModel]}>
          <Text style={[styles.messageText, isUser ? styles.messageTextUser : styles.messageTextModel]}>
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true} onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.botIconWrapper}>
                <FontAwesome5 name="robot" size={20} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.headerTitle}>CarboniX Agent</Text>
                <Text style={styles.headerSubtitle}>Powered by Gemini AI</Text>
              </View>
            </View>
            <View style={styles.headerRight}>
              <TouchableOpacity onPress={handleClearHistory} style={styles.iconBtn}>
                <MaterialIcons name="delete-outline" size={22} color={colors.error} />
              </TouchableOpacity>
              <TouchableOpacity onPress={onClose} style={styles.iconBtn}>
                <MaterialIcons name="close" size={24} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages Area */}
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <FontAwesome5 name="robot" size={48} color={colors.textMuted} style={styles.emptyIcon} />
                <Text style={styles.emptyText}>
                  Hi! I'm your CarboniX AI assistant. I can help you track deployments, switch regions, or send mobile notifications.
                </Text>
              </View>
            }
          />
          
          {isLoading && (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator size="small" color={colors.primary} />
              <Text style={styles.loadingText}>CarboniX Agent is thinking...</Text>
            </View>
          )}

          {/* Input Area */}
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Ask AI to switch regions, check status..."
                placeholderTextColor={colors.textMuted}
                onSubmitEditing={handleSend}
              />
              <TouchableOpacity 
                style={[styles.sendBtn, (!input.trim() || isLoading) && styles.sendBtnDisabled]} 
                onPress={handleSend}
                disabled={!input.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <MaterialIcons name="send" size={20} color="#fff" />
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: '#111827', // gray-900
    height: '85%',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(31,41,55,0.8)', // gray-800
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(55,65,81,0.5)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  botIconWrapper: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    padding: 8,
    borderRadius: 8,
  },
  headerTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  headerSubtitle: {
    color: '#9ca3af', // gray-400
    fontSize: 12,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBtn: {
    padding: 4,
  },
  messagesList: {
    padding: 16,
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyText: {
    color: '#9ca3af',
    textAlign: 'center',
    paddingHorizontal: 32,
    lineHeight: 20,
  },
  messageWrapper: {
    marginVertical: 8,
    flexDirection: 'row',
  },
  messageWrapperUser: {
    justifyContent: 'flex-end',
  },
  messageWrapperModel: {
    justifyContent: 'flex-start',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  messageBubbleUser: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  messageBubbleModel: {
    backgroundColor: '#1f2937', // gray-800
    borderWidth: 1,
    borderColor: '#374151',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 15,
    lineHeight: 22,
  },
  messageTextUser: {
    color: '#fff',
  },
  messageTextModel: {
    color: '#e5e7eb',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  actionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1f2937',
    borderWidth: 1,
    borderColor: '#374151',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
  },
  actionText: {
    color: '#9ca3af',
    fontSize: 12,
  },
  executingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(49,46,129,0.4)', // indigo-900
    borderWidth: 1,
    borderColor: 'rgba(67,56,202,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 8,
  },
  executingText: {
    color: '#a5b4fc', // indigo-300
    fontSize: 12,
  },
  loadingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingHorizontal: 16,
    gap: 8,
  },
  loadingText: {
    color: '#9ca3af',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: 'rgba(31,41,55,0.5)', // gray-800
    borderTopWidth: 1,
    borderTopColor: 'rgba(55,65,81,0.5)',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#111827',
    borderWidth: 1,
    borderColor: '#374151',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    color: '#fff',
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendBtnDisabled: {
    opacity: 0.5,
  }
});
