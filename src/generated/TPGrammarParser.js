// Generated from codegen/TPGrammar.g4 by ANTLR 4.9.2
// jshint ignore: start
import antlr4 from 'antlr4';

const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\'\u0103\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0004\u000b\t\u000b\u0004\f\t\f",
    "\u0004\r\t\r\u0004\u000e\t\u000e\u0004\u000f\t\u000f\u0004\u0010\t\u0010",
    "\u0004\u0011\t\u0011\u0004\u0012\t\u0012\u0004\u0013\t\u0013\u0004\u0014",
    "\t\u0014\u0004\u0015\t\u0015\u0004\u0016\t\u0016\u0004\u0017\t\u0017",
    "\u0004\u0018\t\u0018\u0004\u0019\t\u0019\u0004\u001a\t\u001a\u0004\u001b",
    "\t\u001b\u0003\u0002\u0003\u0002\u0006\u00029\n\u0002\r\u0002\u000e",
    "\u0002:\u0003\u0002\u0003\u0002\u0003\u0002\u0007\u0002@\n\u0002\f\u0002",
    "\u000e\u0002C\u000b\u0002\u0003\u0002\u0003\u0002\u0007\u0002G\n\u0002",
    "\f\u0002\u000e\u0002J\u000b\u0002\u0003\u0002\u0003\u0002\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "T\n\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003q\n\u0003",
    "\u0005\u0003s\n\u0003\u0007\u0003u\n\u0003\f\u0003\u000e\u0003x\u000b",
    "\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003",
    "\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0005\u0004\u0084",
    "\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0005\u0005\u0089\n\u0005",
    "\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003\u0007",
    "\u0003\u0007\u0005\u0007\u0092\n\u0007\u0003\u0007\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0005\b\u009b\n\b\u0003",
    "\b\u0003\b\u0003\b\u0003\b\u0003\t\u0003\t\u0003\t\u0003\n\u0003\n\u0003",
    "\n\u0003\u000b\u0003\u000b\u0003\f\u0003\f\u0003\r\u0003\r\u0003\u000e",
    "\u0003\u000e\u0003\u000f\u0003\u000f\u0003\u0010\u0003\u0010\u0005\u0010",
    "\u00b3\n\u0010\u0003\u0010\u0003\u0010\u0003\u0011\u0003\u0011\u0003",
    "\u0012\u0003\u0012\u0003\u0013\u0003\u0013\u0003\u0013\u0007\u0013\u00be",
    "\n\u0013\f\u0013\u000e\u0013\u00c1\u000b\u0013\u0003\u0014\u0003\u0014",
    "\u0003\u0014\u0007\u0014\u00c6\n\u0014\f\u0014\u000e\u0014\u00c9\u000b",
    "\u0014\u0003\u0015\u0003\u0015\u0003\u0015\u0007\u0015\u00ce\n\u0015",
    "\f\u0015\u000e\u0015\u00d1\u000b\u0015\u0003\u0016\u0003\u0016\u0003",
    "\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003\u0017\u0003",
    "\u0017\u0003\u0017\u0003\u0018\u0003\u0018\u0005\u0018\u00df\n\u0018",
    "\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0018\u0003\u0019\u0003\u0019",
    "\u0003\u0019\u0003\u0019\u0003\u001a\u0003\u001a\u0003\u001b\u0003\u001b",
    "\u0003\u001b\u0006\u001b\u00ee\n\u001b\r\u001b\u000e\u001b\u00ef\u0003",
    "\u001b\u0003\u001b\u0003\u001b\u0007\u001b\u00f5\n\u001b\f\u001b\u000e",
    "\u001b\u00f8\u000b\u001b\u0003\u001b\u0003\u001b\u0007\u001b\u00fc\n",
    "\u001b\f\u001b\u000e\u001b\u00ff\u000b\u001b\u0003\u001b\u0003\u001b",
    "\u0003\u001b\u0002\u0003\u0004\u001c\u0002\u0004\u0006\b\n\f\u000e\u0010",
    "\u0012\u0014\u0016\u0018\u001a\u001c\u001e \"$&(*,.024\u0002\u0007\u0003",
    "\u0002\u001b\u001c\u0003\u0002\u0019\u001a\u0003\u0002\u0017\u0018\u0003",
    "\u0002\u0011\u0016\u0003\u0002\u001d\"\u0002\u010b\u0002A\u0003\u0002",
    "\u0002\u0002\u0004S\u0003\u0002\u0002\u0002\u0006\u0083\u0003\u0002",
    "\u0002\u0002\b\u0088\u0003\u0002\u0002\u0002\n\u008a\u0003\u0002\u0002",
    "\u0002\f\u008e\u0003\u0002\u0002\u0002\u000e\u0098\u0003\u0002\u0002",
    "\u0002\u0010\u00a0\u0003\u0002\u0002\u0002\u0012\u00a3\u0003\u0002\u0002",
    "\u0002\u0014\u00a6\u0003\u0002\u0002\u0002\u0016\u00a8\u0003\u0002\u0002",
    "\u0002\u0018\u00aa\u0003\u0002\u0002\u0002\u001a\u00ac\u0003\u0002\u0002",
    "\u0002\u001c\u00ae\u0003\u0002\u0002\u0002\u001e\u00b0\u0003\u0002\u0002",
    "\u0002 \u00b6\u0003\u0002\u0002\u0002\"\u00b8\u0003\u0002\u0002\u0002",
    "$\u00ba\u0003\u0002\u0002\u0002&\u00c2\u0003\u0002\u0002\u0002(\u00ca",
    "\u0003\u0002\u0002\u0002*\u00d2\u0003\u0002\u0002\u0002,\u00d4\u0003",
    "\u0002\u0002\u0002.\u00dc\u0003\u0002\u0002\u00020\u00e4\u0003\u0002",
    "\u0002\u00022\u00e8\u0003\u0002\u0002\u00024\u00ea\u0003\u0002\u0002",
    "\u000268\u0005\b\u0005\u000279\u0007\u0003\u0002\u000287\u0003\u0002",
    "\u0002\u00029:\u0003\u0002\u0002\u0002:8\u0003\u0002\u0002\u0002:;\u0003",
    "\u0002\u0002\u0002;@\u0003\u0002\u0002\u0002<=\u0005\b\u0005\u0002=",
    ">\u0006\u0002\u0002\u0002>@\u0003\u0002\u0002\u0002?6\u0003\u0002\u0002",
    "\u0002?<\u0003\u0002\u0002\u0002@C\u0003\u0002\u0002\u0002A?\u0003\u0002",
    "\u0002\u0002AB\u0003\u0002\u0002\u0002BD\u0003\u0002\u0002\u0002CA\u0003",
    "\u0002\u0002\u0002DH\u0005\u0004\u0003\u0002EG\u0007\u0003\u0002\u0002",
    "FE\u0003\u0002\u0002\u0002GJ\u0003\u0002\u0002\u0002HF\u0003\u0002\u0002",
    "\u0002HI\u0003\u0002\u0002\u0002IK\u0003\u0002\u0002\u0002JH\u0003\u0002",
    "\u0002\u0002KL\u0007\u0002\u0002\u0003L\u0003\u0003\u0002\u0002\u0002",
    "MN\b\u0003\u0001\u0002NT\u0005\u0006\u0004\u0002OP\t\u0002\u0002\u0002",
    "PT\u0005\u0004\u0003\u000bQR\u0007\u0010\u0002\u0002RT\u0005\u0004\u0003",
    "\u0005SM\u0003\u0002\u0002\u0002SO\u0003\u0002\u0002\u0002SQ\u0003\u0002",
    "\u0002\u0002Tv\u0003\u0002\u0002\u0002UV\f\n\u0002\u0002VW\t\u0003\u0002",
    "\u0002Wu\u0005\u0004\u0003\u000bXY\f\t\u0002\u0002YZ\t\u0002\u0002\u0002",
    "Zu\u0005\u0004\u0003\n[\\\f\b\u0002\u0002\\]\t\u0004\u0002\u0002]u\u0005",
    "\u0004\u0003\t^_\f\u0007\u0002\u0002_`\t\u0005\u0002\u0002`u\u0005\u0004",
    "\u0003\bab\f\u0006\u0002\u0002bc\u0005\u0016\f\u0002cd\u0005\u0004\u0003",
    "\u0007du\u0003\u0002\u0002\u0002ef\f\u0004\u0002\u0002fg\u0007\u000f",
    "\u0002\u0002gu\u0005\u0004\u0003\u0005hi\f\u0003\u0002\u0002ij\u0007",
    "\u000e\u0002\u0002ju\u0005\u0004\u0003\u0004kr\f\f\u0002\u0002ls\u0005",
    "\u001e\u0010\u0002mn\u0007\u0004\u0002\u0002np\u0005\u0014\u000b\u0002",
    "oq\u0005\u001e\u0010\u0002po\u0003\u0002\u0002\u0002pq\u0003\u0002\u0002",
    "\u0002qs\u0003\u0002\u0002\u0002rl\u0003\u0002\u0002\u0002rm\u0003\u0002",
    "\u0002\u0002su\u0003\u0002\u0002\u0002tU\u0003\u0002\u0002\u0002tX\u0003",
    "\u0002\u0002\u0002t[\u0003\u0002\u0002\u0002t^\u0003\u0002\u0002\u0002",
    "ta\u0003\u0002\u0002\u0002te\u0003\u0002\u0002\u0002th\u0003\u0002\u0002",
    "\u0002tk\u0003\u0002\u0002\u0002ux\u0003\u0002\u0002\u0002vt\u0003\u0002",
    "\u0002\u0002vw\u0003\u0002\u0002\u0002w\u0005\u0003\u0002\u0002\u0002",
    "xv\u0003\u0002\u0002\u0002y\u0084\u0005*\u0016\u0002z\u0084\u00052\u001a",
    "\u0002{|\u0007\u0005\u0002\u0002|}\u0005\u0004\u0003\u0002}~\u0007\u0006",
    "\u0002\u0002~\u0084\u0003\u0002\u0002\u0002\u007f\u0084\u0005,\u0017",
    "\u0002\u0080\u0084\u00050\u0019\u0002\u0081\u0084\u0005.\u0018\u0002",
    "\u0082\u0084\u00054\u001b\u0002\u0083y\u0003\u0002\u0002\u0002\u0083",
    "z\u0003\u0002\u0002\u0002\u0083{\u0003\u0002\u0002\u0002\u0083\u007f",
    "\u0003\u0002\u0002\u0002\u0083\u0080\u0003\u0002\u0002\u0002\u0083\u0081",
    "\u0003\u0002\u0002\u0002\u0083\u0082\u0003\u0002\u0002\u0002\u0084\u0007",
    "\u0003\u0002\u0002\u0002\u0085\u0089\u0005\n\u0006\u0002\u0086\u0089",
    "\u0005\u000e\b\u0002\u0087\u0089\u0005\f\u0007\u0002\u0088\u0085\u0003",
    "\u0002\u0002\u0002\u0088\u0086\u0003\u0002\u0002\u0002\u0088\u0087\u0003",
    "\u0002\u0002\u0002\u0089\t\u0003\u0002\u0002\u0002\u008a\u008b\u0005",
    "\u0010\t\u0002\u008b\u008c\u0007\r\u0002\u0002\u008c\u008d\u0005\u0004",
    "\u0003\u0002\u008d\u000b\u0003\u0002\u0002\u0002\u008e\u008f\u0005\u001a",
    "\u000e\u0002\u008f\u0091\u0007\u0005\u0002\u0002\u0090\u0092\u0005&",
    "\u0014\u0002\u0091\u0090\u0003\u0002\u0002\u0002\u0091\u0092\u0003\u0002",
    "\u0002\u0002\u0092\u0093\u0003\u0002\u0002\u0002\u0093\u0094\u0007\u0006",
    "\u0002\u0002\u0094\u0095\u0005\"\u0012\u0002\u0095\u0096\u0007\r\u0002",
    "\u0002\u0096\u0097\u0005\u0004\u0003\u0002\u0097\r\u0003\u0002\u0002",
    "\u0002\u0098\u009a\u0007\u0005\u0002\u0002\u0099\u009b\u0005(\u0015",
    "\u0002\u009a\u0099\u0003\u0002\u0002\u0002\u009a\u009b\u0003\u0002\u0002",
    "\u0002\u009b\u009c\u0003\u0002\u0002\u0002\u009c\u009d\u0007\u0006\u0002",
    "\u0002\u009d\u009e\u0007\r\u0002\u0002\u009e\u009f\u0005\u0004\u0003",
    "\u0002\u009f\u000f\u0003\u0002\u0002\u0002\u00a0\u00a1\u0005\u0018\r",
    "\u0002\u00a1\u00a2\u0005\"\u0012\u0002\u00a2\u0011\u0003\u0002\u0002",
    "\u0002\u00a3\u00a4\u0005\u001c\u000f\u0002\u00a4\u00a5\u0005\"\u0012",
    "\u0002\u00a5\u0013\u0003\u0002\u0002\u0002\u00a6\u00a7\u0007#\u0002",
    "\u0002\u00a7\u0015\u0003\u0002\u0002\u0002\u00a8\u00a9\u0007#\u0002",
    "\u0002\u00a9\u0017\u0003\u0002\u0002\u0002\u00aa\u00ab\u0007#\u0002",
    "\u0002\u00ab\u0019\u0003\u0002\u0002\u0002\u00ac\u00ad\u0007#\u0002",
    "\u0002\u00ad\u001b\u0003\u0002\u0002\u0002\u00ae\u00af\u0007#\u0002",
    "\u0002\u00af\u001d\u0003\u0002\u0002\u0002\u00b0\u00b2\u0007\u0005\u0002",
    "\u0002\u00b1\u00b3\u0005$\u0013\u0002\u00b2\u00b1\u0003\u0002\u0002",
    "\u0002\u00b2\u00b3\u0003\u0002\u0002\u0002\u00b3\u00b4\u0003\u0002\u0002",
    "\u0002\u00b4\u00b5\u0007\u0006\u0002\u0002\u00b5\u001f\u0003\u0002\u0002",
    "\u0002\u00b6\u00b7\u0005\u0004\u0003\u0002\u00b7!\u0003\u0002\u0002",
    "\u0002\u00b8\u00b9\u0003\u0002\u0002\u0002\u00b9#\u0003\u0002\u0002",
    "\u0002\u00ba\u00bf\u0005 \u0011\u0002\u00bb\u00bc\u0007\u0007\u0002",
    "\u0002\u00bc\u00be\u0005 \u0011\u0002\u00bd\u00bb\u0003\u0002\u0002",
    "\u0002\u00be\u00c1\u0003\u0002\u0002\u0002\u00bf\u00bd\u0003\u0002\u0002",
    "\u0002\u00bf\u00c0\u0003\u0002\u0002\u0002\u00c0%\u0003\u0002\u0002",
    "\u0002\u00c1\u00bf\u0003\u0002\u0002\u0002\u00c2\u00c7\u0005\u0012\n",
    "\u0002\u00c3\u00c4\u0007\u0007\u0002\u0002\u00c4\u00c6\u0005\u0012\n",
    "\u0002\u00c5\u00c3\u0003\u0002\u0002\u0002\u00c6\u00c9\u0003\u0002\u0002",
    "\u0002\u00c7\u00c5\u0003\u0002\u0002\u0002\u00c7\u00c8\u0003\u0002\u0002",
    "\u0002\u00c8\'\u0003\u0002\u0002\u0002\u00c9\u00c7\u0003\u0002\u0002",
    "\u0002\u00ca\u00cf\u0005\u0010\t\u0002\u00cb\u00cc\u0007\u0007\u0002",
    "\u0002\u00cc\u00ce\u0005\u0010\t\u0002\u00cd\u00cb\u0003\u0002\u0002",
    "\u0002\u00ce\u00d1\u0003\u0002\u0002\u0002\u00cf\u00cd\u0003\u0002\u0002",
    "\u0002\u00cf\u00d0\u0003\u0002\u0002\u0002\u00d0)\u0003\u0002\u0002",
    "\u0002\u00d1\u00cf\u0003\u0002\u0002\u0002\u00d2\u00d3\t\u0006\u0002",
    "\u0002\u00d3+\u0003\u0002\u0002\u0002\u00d4\u00d5\u0007\u000b\u0002",
    "\u0002\u00d5\u00d6\u0007\u0005\u0002\u0002\u00d6\u00d7\u0005\u0004\u0003",
    "\u0002\u00d7\u00d8\u0007\u0006\u0002\u0002\u00d8\u00d9\u0005\u0004\u0003",
    "\u0002\u00d9\u00da\u0007\f\u0002\u0002\u00da\u00db\u0005\u0004\u0003",
    "\u0002\u00db-\u0003\u0002\u0002\u0002\u00dc\u00de\u0007\u0005\u0002",
    "\u0002\u00dd\u00df\u0005&\u0014\u0002\u00de\u00dd\u0003\u0002\u0002",
    "\u0002\u00de\u00df\u0003\u0002\u0002\u0002\u00df\u00e0\u0003\u0002\u0002",
    "\u0002\u00e0\u00e1\u0007\u0006\u0002\u0002\u00e1\u00e2\u0007\b\u0002",
    "\u0002\u00e2\u00e3\u0005\u0004\u0003\u0002\u00e3/\u0003\u0002\u0002",
    "\u0002\u00e4\u00e5\u0005\u001c\u000f\u0002\u00e5\u00e6\u0007\b\u0002",
    "\u0002\u00e6\u00e7\u0005\u0004\u0003\u0002\u00e71\u0003\u0002\u0002",
    "\u0002\u00e8\u00e9\u0007#\u0002\u0002\u00e93\u0003\u0002\u0002\u0002",
    "\u00ea\u00f6\u0007\t\u0002\u0002\u00eb\u00ed\u0005\b\u0005\u0002\u00ec",
    "\u00ee\u0007\u0003\u0002\u0002\u00ed\u00ec\u0003\u0002\u0002\u0002\u00ee",
    "\u00ef\u0003\u0002\u0002\u0002\u00ef\u00ed\u0003\u0002\u0002\u0002\u00ef",
    "\u00f0\u0003\u0002\u0002\u0002\u00f0\u00f5\u0003\u0002\u0002\u0002\u00f1",
    "\u00f2\u0005\b\u0005\u0002\u00f2\u00f3\u0006\u001b\u000b\u0002\u00f3",
    "\u00f5\u0003\u0002\u0002\u0002\u00f4\u00eb\u0003\u0002\u0002\u0002\u00f4",
    "\u00f1\u0003\u0002\u0002\u0002\u00f5\u00f8\u0003\u0002\u0002\u0002\u00f6",
    "\u00f4\u0003\u0002\u0002\u0002\u00f6\u00f7\u0003\u0002\u0002\u0002\u00f7",
    "\u00f9\u0003\u0002\u0002\u0002\u00f8\u00f6\u0003\u0002\u0002\u0002\u00f9",
    "\u00fd\u0005\u0004\u0003\u0002\u00fa\u00fc\u0007\u0003\u0002\u0002\u00fb",
    "\u00fa\u0003\u0002\u0002\u0002\u00fc\u00ff\u0003\u0002\u0002\u0002\u00fd",
    "\u00fb\u0003\u0002\u0002\u0002\u00fd\u00fe\u0003\u0002\u0002\u0002\u00fe",
    "\u0100\u0003\u0002\u0002\u0002\u00ff\u00fd\u0003\u0002\u0002\u0002\u0100",
    "\u0101\u0007\n\u0002\u0002\u01015\u0003\u0002\u0002\u0002\u0018:?AH",
    "Sprtv\u0083\u0088\u0091\u009a\u00b2\u00bf\u00c7\u00cf\u00de\u00ef\u00f4",
    "\u00f6\u00fd"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class TPGrammarParser extends antlr4.Parser {

    static grammarFileName = "TPGrammar.g4";
    static literalNames = [ null, "';'", "'.'", "'('", "')'", "','", "'->'", 
                            "'{'", "'}'", "'if'", "'else'", "'='", "'or'", 
                            "'and'", "'not'", "'=='", "'<'", null, "'>'", 
                            null, null, "'++'", "'--'", null, null, "'+'" ];
    static symbolicNames = [ null, null, null, null, null, null, null, null, 
                             null, "IF", "ELSE", "EQ_DEF", "OR", "AND", 
                             "NOT", "EQ", "LT", "LE", "GT", "GE", "NEQ", 
                             "CONCAT", "MINUSMINUS", "MUL", "DIV", "PLUS", 
                             "MINUS", "BOOLEAN", "INTEGER", "FLOAT", "STRING", 
                             "NATIVE", "INVALID_LITERAL", "ID", "WS", "COMMENT", 
                             "LINE_COMMENT", "LINE_COMMENT_EOF" ];
    static ruleNames = [ "topLevel", "expr", "simpleExpr", "definition", 
                         "valueDefinition", "functionDefinition", "tupleDefinition", 
                         "typedVar", "typedParam", "attr", "userOpId", "varId", 
                         "functionId", "paramId", "apply", "arg", "typeAnnotation", 
                         "args", "typedParams", "typedVars", "literalExpr", 
                         "ifElseExpr", "lambdaExpr", "shortLambdaExpr", 
                         "varExpr", "letExpr" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = TPGrammarParser.ruleNames;
        this.literalNames = TPGrammarParser.literalNames;
        this.symbolicNames = TPGrammarParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 0:
    	    		return this.topLevel_sempred(localctx, predIndex);
    	case 1:
    	    		return this.expr_sempred(localctx, predIndex);
    	case 25:
    	    		return this.letExpr_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    topLevel_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return  this.newline() ;
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    expr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 1:
    			return this.precpred(this._ctx, 8);
    		case 2:
    			return this.precpred(this._ctx, 7);
    		case 3:
    			return this.precpred(this._ctx, 6);
    		case 4:
    			return this.precpred(this._ctx, 5);
    		case 5:
    			return this.precpred(this._ctx, 4);
    		case 6:
    			return this.precpred(this._ctx, 2);
    		case 7:
    			return this.precpred(this._ctx, 1);
    		case 8:
    			return this.precpred(this._ctx, 10);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };

    letExpr_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 9:
    			return  this.newline() ;
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	topLevel() {
	    let localctx = new TopLevelContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, TPGrammarParser.RULE_topLevel);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 63;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,2,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 61;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,1,this._ctx);
	                switch(la_) {
	                case 1:
	                    this.state = 52;
	                    this.definition();
	                    this.state = 54; 
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    do {
	                        this.state = 53;
	                        this.match(TPGrammarParser.T__0);
	                        this.state = 56; 
	                        this._errHandler.sync(this);
	                        _la = this._input.LA(1);
	                    } while(_la===TPGrammarParser.T__0);
	                    break;

	                case 2:
	                    this.state = 58;
	                    this.definition();
	                    this.state = 59;
	                    if (!(  this.newline() )) {
	                        throw new antlr4.error.FailedPredicateException(this, " this.newline() ");
	                    }
	                    break;

	                } 
	            }
	            this.state = 65;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,2,this._ctx);
	        }

	        this.state = 66;
	        this.expr(0);
	        this.state = 70;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===TPGrammarParser.T__0) {
	            this.state = 67;
	            this.match(TPGrammarParser.T__0);
	            this.state = 72;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 73;
	        this.match(TPGrammarParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expr(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExprContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 2;
	    this.enterRecursionRule(localctx, 2, TPGrammarParser.RULE_expr, _p);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 81;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case TPGrammarParser.T__2:
	        case TPGrammarParser.T__6:
	        case TPGrammarParser.IF:
	        case TPGrammarParser.BOOLEAN:
	        case TPGrammarParser.INTEGER:
	        case TPGrammarParser.FLOAT:
	        case TPGrammarParser.STRING:
	        case TPGrammarParser.NATIVE:
	        case TPGrammarParser.INVALID_LITERAL:
	        case TPGrammarParser.ID:
	            localctx = new SimpleContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 76;
	            this.simpleExpr();
	            break;
	        case TPGrammarParser.PLUS:
	        case TPGrammarParser.MINUS:
	            localctx = new UnOpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 77;
	            _la = this._input.LA(1);
	            if(!(_la===TPGrammarParser.PLUS || _la===TPGrammarParser.MINUS)) {
	            this._errHandler.recoverInline(this);
	            }
	            else {
	            	this._errHandler.reportMatch(this);
	                this.consume();
	            }
	            this.state = 78;
	            this.expr(9);
	            break;
	        case TPGrammarParser.NOT:
	            localctx = new UnOpContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;
	            this.state = 79;
	            this.match(TPGrammarParser.NOT);
	            this.state = 80;
	            this.expr(3);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 116;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,8,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                this.state = 114;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,7,this._ctx);
	                switch(la_) {
	                case 1:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 83;
	                    if (!( this.precpred(this._ctx, 8))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 8)");
	                    }
	                    this.state = 84;
	                    _la = this._input.LA(1);
	                    if(!(_la===TPGrammarParser.MUL || _la===TPGrammarParser.DIV)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 85;
	                    this.expr(9);
	                    break;

	                case 2:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 86;
	                    if (!( this.precpred(this._ctx, 7))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 7)");
	                    }
	                    this.state = 87;
	                    _la = this._input.LA(1);
	                    if(!(_la===TPGrammarParser.PLUS || _la===TPGrammarParser.MINUS)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 88;
	                    this.expr(8);
	                    break;

	                case 3:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 89;
	                    if (!( this.precpred(this._ctx, 6))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 6)");
	                    }
	                    this.state = 90;
	                    _la = this._input.LA(1);
	                    if(!(_la===TPGrammarParser.CONCAT || _la===TPGrammarParser.MINUSMINUS)) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 91;
	                    this.expr(7);
	                    break;

	                case 4:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 92;
	                    if (!( this.precpred(this._ctx, 5))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 5)");
	                    }
	                    this.state = 93;
	                    _la = this._input.LA(1);
	                    if(!((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << TPGrammarParser.EQ) | (1 << TPGrammarParser.LT) | (1 << TPGrammarParser.LE) | (1 << TPGrammarParser.GT) | (1 << TPGrammarParser.GE) | (1 << TPGrammarParser.NEQ))) !== 0))) {
	                    this._errHandler.recoverInline(this);
	                    }
	                    else {
	                    	this._errHandler.reportMatch(this);
	                        this.consume();
	                    }
	                    this.state = 94;
	                    this.expr(6);
	                    break;

	                case 5:
	                    localctx = new UserOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 95;
	                    if (!( this.precpred(this._ctx, 4))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 4)");
	                    }
	                    this.state = 96;
	                    this.userOpId();
	                    this.state = 97;
	                    this.expr(5);
	                    break;

	                case 6:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 99;
	                    if (!( this.precpred(this._ctx, 2))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                    }
	                    this.state = 100;
	                    this.match(TPGrammarParser.AND);
	                    this.state = 101;
	                    this.expr(3);
	                    break;

	                case 7:
	                    localctx = new BinOpContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 102;
	                    if (!( this.precpred(this._ctx, 1))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 1)");
	                    }
	                    this.state = 103;
	                    this.match(TPGrammarParser.OR);
	                    this.state = 104;
	                    this.expr(2);
	                    break;

	                case 8:
	                    localctx = new CallContext(this, new ExprContext(this, _parentctx, _parentState));
	                    this.pushNewRecursionContext(localctx, _startState, TPGrammarParser.RULE_expr);
	                    this.state = 105;
	                    if (!( this.precpred(this._ctx, 10))) {
	                        throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 10)");
	                    }
	                    this.state = 112;
	                    this._errHandler.sync(this);
	                    switch(this._input.LA(1)) {
	                    case TPGrammarParser.T__2:
	                        this.state = 106;
	                        this.apply();
	                        break;
	                    case TPGrammarParser.T__1:
	                        this.state = 107;
	                        this.match(TPGrammarParser.T__1);
	                        this.state = 108;
	                        this.attr();
	                        this.state = 110;
	                        this._errHandler.sync(this);
	                        var la_ = this._interp.adaptivePredict(this._input,5,this._ctx);
	                        if(la_===1) {
	                            this.state = 109;
	                            this.apply();

	                        }
	                        break;
	                    default:
	                        throw new antlr4.error.NoViableAltException(this);
	                    }
	                    break;

	                } 
	            }
	            this.state = 118;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,8,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	simpleExpr() {
	    let localctx = new SimpleExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, TPGrammarParser.RULE_simpleExpr);
	    try {
	        this.state = 129;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,9,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 119;
	            this.literalExpr();
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 120;
	            this.varExpr();
	            break;

	        case 3:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 121;
	            this.match(TPGrammarParser.T__2);
	            this.state = 122;
	            this.expr(0);
	            this.state = 123;
	            this.match(TPGrammarParser.T__3);
	            break;

	        case 4:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 125;
	            this.ifElseExpr();
	            break;

	        case 5:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 126;
	            this.shortLambdaExpr();
	            break;

	        case 6:
	            this.enterOuterAlt(localctx, 6);
	            this.state = 127;
	            this.lambdaExpr();
	            break;

	        case 7:
	            this.enterOuterAlt(localctx, 7);
	            this.state = 128;
	            this.letExpr();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	definition() {
	    let localctx = new DefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, TPGrammarParser.RULE_definition);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 134;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,10,this._ctx);
	        switch(la_) {
	        case 1:
	            this.state = 131;
	            this.valueDefinition();
	            break;

	        case 2:
	            this.state = 132;
	            this.tupleDefinition();
	            break;

	        case 3:
	            this.state = 133;
	            this.functionDefinition();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	valueDefinition() {
	    let localctx = new ValueDefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, TPGrammarParser.RULE_valueDefinition);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 136;
	        this.typedVar();
	        this.state = 137;
	        this.match(TPGrammarParser.EQ_DEF);
	        this.state = 138;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functionDefinition() {
	    let localctx = new FunctionDefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, TPGrammarParser.RULE_functionDefinition);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 140;
	        this.functionId();
	        this.state = 141;
	        this.match(TPGrammarParser.T__2);
	        this.state = 143;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===TPGrammarParser.ID) {
	            this.state = 142;
	            this.typedParams();
	        }

	        this.state = 145;
	        this.match(TPGrammarParser.T__3);
	        this.state = 146;
	        this.typeAnnotation();
	        this.state = 147;
	        this.match(TPGrammarParser.EQ_DEF);
	        this.state = 148;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	tupleDefinition() {
	    let localctx = new TupleDefinitionContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 12, TPGrammarParser.RULE_tupleDefinition);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 150;
	        this.match(TPGrammarParser.T__2);
	        this.state = 152;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===TPGrammarParser.ID) {
	            this.state = 151;
	            this.typedVars();
	        }

	        this.state = 154;
	        this.match(TPGrammarParser.T__3);
	        this.state = 155;
	        this.match(TPGrammarParser.EQ_DEF);
	        this.state = 156;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typedVar() {
	    let localctx = new TypedVarContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, TPGrammarParser.RULE_typedVar);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 158;
	        this.varId();
	        this.state = 159;
	        this.typeAnnotation();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typedParam() {
	    let localctx = new TypedParamContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, TPGrammarParser.RULE_typedParam);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 161;
	        this.paramId();
	        this.state = 162;
	        this.typeAnnotation();
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	attr() {
	    let localctx = new AttrContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 18, TPGrammarParser.RULE_attr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 164;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	userOpId() {
	    let localctx = new UserOpIdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 20, TPGrammarParser.RULE_userOpId);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 166;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varId() {
	    let localctx = new VarIdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 22, TPGrammarParser.RULE_varId);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 168;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	functionId() {
	    let localctx = new FunctionIdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 24, TPGrammarParser.RULE_functionId);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 170;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	paramId() {
	    let localctx = new ParamIdContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 26, TPGrammarParser.RULE_paramId);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 172;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	apply() {
	    let localctx = new ApplyContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 28, TPGrammarParser.RULE_apply);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 174;
	        this.match(TPGrammarParser.T__2);
	        this.state = 176;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(((((_la - 3)) & ~0x1f) == 0 && ((1 << (_la - 3)) & ((1 << (TPGrammarParser.T__2 - 3)) | (1 << (TPGrammarParser.T__6 - 3)) | (1 << (TPGrammarParser.IF - 3)) | (1 << (TPGrammarParser.NOT - 3)) | (1 << (TPGrammarParser.PLUS - 3)) | (1 << (TPGrammarParser.MINUS - 3)) | (1 << (TPGrammarParser.BOOLEAN - 3)) | (1 << (TPGrammarParser.INTEGER - 3)) | (1 << (TPGrammarParser.FLOAT - 3)) | (1 << (TPGrammarParser.STRING - 3)) | (1 << (TPGrammarParser.NATIVE - 3)) | (1 << (TPGrammarParser.INVALID_LITERAL - 3)) | (1 << (TPGrammarParser.ID - 3)))) !== 0)) {
	            this.state = 175;
	            this.args();
	        }

	        this.state = 178;
	        this.match(TPGrammarParser.T__3);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	arg() {
	    let localctx = new ArgContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 30, TPGrammarParser.RULE_arg);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 180;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typeAnnotation() {
	    let localctx = new TypeAnnotationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 32, TPGrammarParser.RULE_typeAnnotation);
	    try {
	        this.enterOuterAlt(localctx, 1);

	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	args() {
	    let localctx = new ArgsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 34, TPGrammarParser.RULE_args);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 184;
	        this.arg();
	        this.state = 189;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===TPGrammarParser.T__4) {
	            this.state = 185;
	            this.match(TPGrammarParser.T__4);
	            this.state = 186;
	            this.arg();
	            this.state = 191;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typedParams() {
	    let localctx = new TypedParamsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 36, TPGrammarParser.RULE_typedParams);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 192;
	        this.typedParam();
	        this.state = 197;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===TPGrammarParser.T__4) {
	            this.state = 193;
	            this.match(TPGrammarParser.T__4);
	            this.state = 194;
	            this.typedParam();
	            this.state = 199;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	typedVars() {
	    let localctx = new TypedVarsContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 38, TPGrammarParser.RULE_typedVars);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 200;
	        this.typedVar();
	        this.state = 205;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===TPGrammarParser.T__4) {
	            this.state = 201;
	            this.match(TPGrammarParser.T__4);
	            this.state = 202;
	            this.typedVar();
	            this.state = 207;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	literalExpr() {
	    let localctx = new LiteralExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 40, TPGrammarParser.RULE_literalExpr);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 208;
	        _la = this._input.LA(1);
	        if(!(((((_la - 27)) & ~0x1f) == 0 && ((1 << (_la - 27)) & ((1 << (TPGrammarParser.BOOLEAN - 27)) | (1 << (TPGrammarParser.INTEGER - 27)) | (1 << (TPGrammarParser.FLOAT - 27)) | (1 << (TPGrammarParser.STRING - 27)) | (1 << (TPGrammarParser.NATIVE - 27)) | (1 << (TPGrammarParser.INVALID_LITERAL - 27)))) !== 0))) {
	        this._errHandler.recoverInline(this);
	        }
	        else {
	        	this._errHandler.reportMatch(this);
	            this.consume();
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ifElseExpr() {
	    let localctx = new IfElseExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 42, TPGrammarParser.RULE_ifElseExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 210;
	        this.match(TPGrammarParser.IF);
	        this.state = 211;
	        this.match(TPGrammarParser.T__2);
	        this.state = 212;
	        this.expr(0);
	        this.state = 213;
	        this.match(TPGrammarParser.T__3);
	        this.state = 214;
	        this.expr(0);
	        this.state = 215;
	        this.match(TPGrammarParser.ELSE);
	        this.state = 216;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	lambdaExpr() {
	    let localctx = new LambdaExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 44, TPGrammarParser.RULE_lambdaExpr);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 218;
	        this.match(TPGrammarParser.T__2);
	        this.state = 220;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        if(_la===TPGrammarParser.ID) {
	            this.state = 219;
	            this.typedParams();
	        }

	        this.state = 222;
	        this.match(TPGrammarParser.T__3);
	        this.state = 223;
	        this.match(TPGrammarParser.T__5);
	        this.state = 224;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	shortLambdaExpr() {
	    let localctx = new ShortLambdaExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 46, TPGrammarParser.RULE_shortLambdaExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 226;
	        this.paramId();
	        this.state = 227;
	        this.match(TPGrammarParser.T__5);
	        this.state = 228;
	        this.expr(0);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	varExpr() {
	    let localctx = new VarExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 48, TPGrammarParser.RULE_varExpr);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 230;
	        this.match(TPGrammarParser.ID);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	letExpr() {
	    let localctx = new LetExprContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 50, TPGrammarParser.RULE_letExpr);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 232;
	        this.match(TPGrammarParser.T__6);
	        this.state = 244;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,20,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                this.state = 242;
	                this._errHandler.sync(this);
	                var la_ = this._interp.adaptivePredict(this._input,19,this._ctx);
	                switch(la_) {
	                case 1:
	                    this.state = 233;
	                    this.definition();
	                    this.state = 235; 
	                    this._errHandler.sync(this);
	                    _la = this._input.LA(1);
	                    do {
	                        this.state = 234;
	                        this.match(TPGrammarParser.T__0);
	                        this.state = 237; 
	                        this._errHandler.sync(this);
	                        _la = this._input.LA(1);
	                    } while(_la===TPGrammarParser.T__0);
	                    break;

	                case 2:
	                    this.state = 239;
	                    this.definition();
	                    this.state = 240;
	                    if (!(  this.newline() )) {
	                        throw new antlr4.error.FailedPredicateException(this, " this.newline() ");
	                    }
	                    break;

	                } 
	            }
	            this.state = 246;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,20,this._ctx);
	        }

	        this.state = 247;
	        this.expr(0);
	        this.state = 251;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while(_la===TPGrammarParser.T__0) {
	            this.state = 248;
	            this.match(TPGrammarParser.T__0);
	            this.state = 253;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 254;
	        this.match(TPGrammarParser.T__7);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

TPGrammarParser.EOF = antlr4.Token.EOF;
TPGrammarParser.T__0 = 1;
TPGrammarParser.T__1 = 2;
TPGrammarParser.T__2 = 3;
TPGrammarParser.T__3 = 4;
TPGrammarParser.T__4 = 5;
TPGrammarParser.T__5 = 6;
TPGrammarParser.T__6 = 7;
TPGrammarParser.T__7 = 8;
TPGrammarParser.IF = 9;
TPGrammarParser.ELSE = 10;
TPGrammarParser.EQ_DEF = 11;
TPGrammarParser.OR = 12;
TPGrammarParser.AND = 13;
TPGrammarParser.NOT = 14;
TPGrammarParser.EQ = 15;
TPGrammarParser.LT = 16;
TPGrammarParser.LE = 17;
TPGrammarParser.GT = 18;
TPGrammarParser.GE = 19;
TPGrammarParser.NEQ = 20;
TPGrammarParser.CONCAT = 21;
TPGrammarParser.MINUSMINUS = 22;
TPGrammarParser.MUL = 23;
TPGrammarParser.DIV = 24;
TPGrammarParser.PLUS = 25;
TPGrammarParser.MINUS = 26;
TPGrammarParser.BOOLEAN = 27;
TPGrammarParser.INTEGER = 28;
TPGrammarParser.FLOAT = 29;
TPGrammarParser.STRING = 30;
TPGrammarParser.NATIVE = 31;
TPGrammarParser.INVALID_LITERAL = 32;
TPGrammarParser.ID = 33;
TPGrammarParser.WS = 34;
TPGrammarParser.COMMENT = 35;
TPGrammarParser.LINE_COMMENT = 36;
TPGrammarParser.LINE_COMMENT_EOF = 37;

TPGrammarParser.RULE_topLevel = 0;
TPGrammarParser.RULE_expr = 1;
TPGrammarParser.RULE_simpleExpr = 2;
TPGrammarParser.RULE_definition = 3;
TPGrammarParser.RULE_valueDefinition = 4;
TPGrammarParser.RULE_functionDefinition = 5;
TPGrammarParser.RULE_tupleDefinition = 6;
TPGrammarParser.RULE_typedVar = 7;
TPGrammarParser.RULE_typedParam = 8;
TPGrammarParser.RULE_attr = 9;
TPGrammarParser.RULE_userOpId = 10;
TPGrammarParser.RULE_varId = 11;
TPGrammarParser.RULE_functionId = 12;
TPGrammarParser.RULE_paramId = 13;
TPGrammarParser.RULE_apply = 14;
TPGrammarParser.RULE_arg = 15;
TPGrammarParser.RULE_typeAnnotation = 16;
TPGrammarParser.RULE_args = 17;
TPGrammarParser.RULE_typedParams = 18;
TPGrammarParser.RULE_typedVars = 19;
TPGrammarParser.RULE_literalExpr = 20;
TPGrammarParser.RULE_ifElseExpr = 21;
TPGrammarParser.RULE_lambdaExpr = 22;
TPGrammarParser.RULE_shortLambdaExpr = 23;
TPGrammarParser.RULE_varExpr = 24;
TPGrammarParser.RULE_letExpr = 25;

class TopLevelContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_topLevel;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	EOF() {
	    return this.getToken(TPGrammarParser.EOF, 0);
	};

	definition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DefinitionContext);
	    } else {
	        return this.getTypedRuleContext(DefinitionContext,i);
	    }
	};


}



class ExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_expr;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class CallContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	apply() {
	    return this.getTypedRuleContext(ApplyContext,0);
	};

	attr() {
	    return this.getTypedRuleContext(AttrContext,0);
	};


}

TPGrammarParser.CallContext = CallContext;

class UserOpContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	userOpId() {
	    return this.getTypedRuleContext(UserOpIdContext,0);
	};


}

TPGrammarParser.UserOpContext = UserOpContext;

class SimpleContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	simpleExpr() {
	    return this.getTypedRuleContext(SimpleExprContext,0);
	};


}

TPGrammarParser.SimpleContext = SimpleContext;

class UnOpContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	PLUS() {
	    return this.getToken(TPGrammarParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(TPGrammarParser.MINUS, 0);
	};

	NOT() {
	    return this.getToken(TPGrammarParser.NOT, 0);
	};


}

TPGrammarParser.UnOpContext = UnOpContext;

class BinOpContext extends ExprContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	MUL() {
	    return this.getToken(TPGrammarParser.MUL, 0);
	};

	DIV() {
	    return this.getToken(TPGrammarParser.DIV, 0);
	};

	PLUS() {
	    return this.getToken(TPGrammarParser.PLUS, 0);
	};

	MINUS() {
	    return this.getToken(TPGrammarParser.MINUS, 0);
	};

	CONCAT() {
	    return this.getToken(TPGrammarParser.CONCAT, 0);
	};

	MINUSMINUS() {
	    return this.getToken(TPGrammarParser.MINUSMINUS, 0);
	};

	EQ() {
	    return this.getToken(TPGrammarParser.EQ, 0);
	};

	LT() {
	    return this.getToken(TPGrammarParser.LT, 0);
	};

	LE() {
	    return this.getToken(TPGrammarParser.LE, 0);
	};

	GT() {
	    return this.getToken(TPGrammarParser.GT, 0);
	};

	GE() {
	    return this.getToken(TPGrammarParser.GE, 0);
	};

	NEQ() {
	    return this.getToken(TPGrammarParser.NEQ, 0);
	};

	AND() {
	    return this.getToken(TPGrammarParser.AND, 0);
	};

	OR() {
	    return this.getToken(TPGrammarParser.OR, 0);
	};


}

TPGrammarParser.BinOpContext = BinOpContext;

class SimpleExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_simpleExpr;
    }

	literalExpr() {
	    return this.getTypedRuleContext(LiteralExprContext,0);
	};

	varExpr() {
	    return this.getTypedRuleContext(VarExprContext,0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	ifElseExpr() {
	    return this.getTypedRuleContext(IfElseExprContext,0);
	};

	shortLambdaExpr() {
	    return this.getTypedRuleContext(ShortLambdaExprContext,0);
	};

	lambdaExpr() {
	    return this.getTypedRuleContext(LambdaExprContext,0);
	};

	letExpr() {
	    return this.getTypedRuleContext(LetExprContext,0);
	};


}



class DefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_definition;
    }

	valueDefinition() {
	    return this.getTypedRuleContext(ValueDefinitionContext,0);
	};

	tupleDefinition() {
	    return this.getTypedRuleContext(TupleDefinitionContext,0);
	};

	functionDefinition() {
	    return this.getTypedRuleContext(FunctionDefinitionContext,0);
	};


}



class ValueDefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_valueDefinition;
    }

	typedVar() {
	    return this.getTypedRuleContext(TypedVarContext,0);
	};

	EQ_DEF() {
	    return this.getToken(TPGrammarParser.EQ_DEF, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};


}



class FunctionDefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_functionDefinition;
    }

	functionId() {
	    return this.getTypedRuleContext(FunctionIdContext,0);
	};

	typeAnnotation() {
	    return this.getTypedRuleContext(TypeAnnotationContext,0);
	};

	EQ_DEF() {
	    return this.getToken(TPGrammarParser.EQ_DEF, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	typedParams() {
	    return this.getTypedRuleContext(TypedParamsContext,0);
	};


}



class TupleDefinitionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_tupleDefinition;
    }

	EQ_DEF() {
	    return this.getToken(TPGrammarParser.EQ_DEF, 0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	typedVars() {
	    return this.getTypedRuleContext(TypedVarsContext,0);
	};


}



class TypedVarContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_typedVar;
    }

	varId() {
	    return this.getTypedRuleContext(VarIdContext,0);
	};

	typeAnnotation() {
	    return this.getTypedRuleContext(TypeAnnotationContext,0);
	};


}



class TypedParamContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_typedParam;
    }

	paramId() {
	    return this.getTypedRuleContext(ParamIdContext,0);
	};

	typeAnnotation() {
	    return this.getTypedRuleContext(TypeAnnotationContext,0);
	};


}



class AttrContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_attr;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class UserOpIdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_userOpId;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class VarIdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_varId;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class FunctionIdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_functionId;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class ParamIdContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_paramId;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class ApplyContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_apply;
    }

	args() {
	    return this.getTypedRuleContext(ArgsContext,0);
	};


}



class ArgContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_arg;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};


}



class TypeAnnotationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_typeAnnotation;
    }



}



class ArgsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_args;
    }

	arg = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ArgContext);
	    } else {
	        return this.getTypedRuleContext(ArgContext,i);
	    }
	};


}



class TypedParamsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_typedParams;
    }

	typedParam = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TypedParamContext);
	    } else {
	        return this.getTypedRuleContext(TypedParamContext,i);
	    }
	};


}



class TypedVarsContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_typedVars;
    }

	typedVar = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(TypedVarContext);
	    } else {
	        return this.getTypedRuleContext(TypedVarContext,i);
	    }
	};


}



class LiteralExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_literalExpr;
    }

	INTEGER() {
	    return this.getToken(TPGrammarParser.INTEGER, 0);
	};

	FLOAT() {
	    return this.getToken(TPGrammarParser.FLOAT, 0);
	};

	BOOLEAN() {
	    return this.getToken(TPGrammarParser.BOOLEAN, 0);
	};

	STRING() {
	    return this.getToken(TPGrammarParser.STRING, 0);
	};

	NATIVE() {
	    return this.getToken(TPGrammarParser.NATIVE, 0);
	};

	INVALID_LITERAL() {
	    return this.getToken(TPGrammarParser.INVALID_LITERAL, 0);
	};


}



class IfElseExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_ifElseExpr;
    }

	IF() {
	    return this.getToken(TPGrammarParser.IF, 0);
	};

	expr = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExprContext);
	    } else {
	        return this.getTypedRuleContext(ExprContext,i);
	    }
	};

	ELSE() {
	    return this.getToken(TPGrammarParser.ELSE, 0);
	};


}



class LambdaExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_lambdaExpr;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	typedParams() {
	    return this.getTypedRuleContext(TypedParamsContext,0);
	};


}



class ShortLambdaExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_shortLambdaExpr;
    }

	paramId() {
	    return this.getTypedRuleContext(ParamIdContext,0);
	};

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};


}



class VarExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_varExpr;
    }

	ID() {
	    return this.getToken(TPGrammarParser.ID, 0);
	};


}



class LetExprContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = TPGrammarParser.RULE_letExpr;
    }

	expr() {
	    return this.getTypedRuleContext(ExprContext,0);
	};

	definition = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(DefinitionContext);
	    } else {
	        return this.getTypedRuleContext(DefinitionContext,i);
	    }
	};


}




TPGrammarParser.TopLevelContext = TopLevelContext; 
TPGrammarParser.ExprContext = ExprContext; 
TPGrammarParser.SimpleExprContext = SimpleExprContext; 
TPGrammarParser.DefinitionContext = DefinitionContext; 
TPGrammarParser.ValueDefinitionContext = ValueDefinitionContext; 
TPGrammarParser.FunctionDefinitionContext = FunctionDefinitionContext; 
TPGrammarParser.TupleDefinitionContext = TupleDefinitionContext; 
TPGrammarParser.TypedVarContext = TypedVarContext; 
TPGrammarParser.TypedParamContext = TypedParamContext; 
TPGrammarParser.AttrContext = AttrContext; 
TPGrammarParser.UserOpIdContext = UserOpIdContext; 
TPGrammarParser.VarIdContext = VarIdContext; 
TPGrammarParser.FunctionIdContext = FunctionIdContext; 
TPGrammarParser.ParamIdContext = ParamIdContext; 
TPGrammarParser.ApplyContext = ApplyContext; 
TPGrammarParser.ArgContext = ArgContext; 
TPGrammarParser.TypeAnnotationContext = TypeAnnotationContext; 
TPGrammarParser.ArgsContext = ArgsContext; 
TPGrammarParser.TypedParamsContext = TypedParamsContext; 
TPGrammarParser.TypedVarsContext = TypedVarsContext; 
TPGrammarParser.LiteralExprContext = LiteralExprContext; 
TPGrammarParser.IfElseExprContext = IfElseExprContext; 
TPGrammarParser.LambdaExprContext = LambdaExprContext; 
TPGrammarParser.ShortLambdaExprContext = ShortLambdaExprContext; 
TPGrammarParser.VarExprContext = VarExprContext; 
TPGrammarParser.LetExprContext = LetExprContext; 
